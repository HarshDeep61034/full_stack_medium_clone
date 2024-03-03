import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'

const user = new Hono<{
    Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();


user.post("/signup", async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    interface Body{
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    }

    const body: Body = await c.req.json();
    const userInDb = await prisma.user.findMany({where:{email: body.email}});
    const userExist = userInDb.length > 0;

    if(userExist){
      c.status(409);
      return c.json({success: false, message: "User Already Exists!"});
    }

let token;
try{
    const res = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          username: body.username,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });


      const payload = {
         email: body.email,
         id: res.id,
         username: res.username,
      };

      token = await sign(payload, c.env.JWT_SECRET);
}

catch(err){
  console.log("ERROR: " + err);
}

    c.status(200);
    return c.json({success: true, message: "User Created Sucessfully", token});
});

// SIGIN END POINT

user.post("/signin", async (c)=>{
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

 interface Body{
  email: string;
  password: string;
 }

 const body: Body = await c.req.json();
 console.log(body);
 const userInDb = await prisma.user.findMany({where:{email: body.email}});
 const userExist = userInDb.length > 0;
 if(!userExist){
  c.status(404);
  return c.json({success: false, message: "User doesn't exist!"});
 }

 const passwordMatched = (userInDb[0].password == body.password);
 
 if(!passwordMatched){
  c.status(401);
  return c.json({success: false, message: "Invalid Password or Username"});
 }

 const payload = {
  email: userInDb[0].email,
  id: userInDb[0].id,
 }

 const token = await sign(payload, c.env.JWT_SECRET);

  return c.json({success: true, message: "User Authenticated!", token});
});

export default user;