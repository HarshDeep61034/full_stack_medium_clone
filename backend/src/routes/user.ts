import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const user = new Hono<{
    Bindings: {
		DATABASE_URL: string
	}
}>();
// id String @id @default(uuid())
// email String @unique
// password String
// username String @unique
// firstName String
// lastName String?
// createdOn DateTime @db.Date
// posts Post[]
user.post("/signup", async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,log: ['query']
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
   
    console.log(body);
try{
    const newUser = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          username: body.username,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });
}
catch(err){
console.log("ERROR: " + err);
}
    return c.text("User Created Successfully");
});

user.get("/signin", (c)=>c.text("User LoggedIN"));

export default user;