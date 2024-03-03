import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt } from "hono/jwt";

const blog = new Hono<{
   Bindings: {
     DATABASE_URL: string,
     JWT_SECRET: string,
  }
}>();

blog.use(
   (c, next) => {
     const jwtMiddleware = jwt({
       secret: c.env.JWT_SECRET,
     })
     return jwtMiddleware(c, next)
   }
 )


blog.post("/", async (c)=>{
   const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  console.log(c);
  const userdata = c.get('jwtPayload');

  const body = await c.req.json();
  console.log(body);
  const res = await prisma.post.create({
   data: {
      title: body.title,
      authorId: userdata.id,
      content: body.content,
      published: body.published,
   }
  })
  c.status(200);
  return c.json({id: res.id, success: true, message: "Blog Created Successfully"});

});

blog.get("/:id", async(c) => {

   const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

    const id = c.req.param('id');
    const res = await prisma.post.findUnique({where: {id}});
    c.status(200);
   return  c.json(res);
});

blog.put("/:id", async (c)=>{

   const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

   const id = c.req.param('id');
   const userData = c.get('jwtPayload');
   const body = await c.req.json();
   const blog = await prisma.post.findMany({where: { id }});
   const userAuth = (blog[0].authorId == userData.id);

   if(!userAuth) {
      c.status(401);
      return c.json({success: false, message: "Invalid Credentials"});
   }

   const res = await prisma.post.update({where: { id }, data: {
      title: body.title || undefined,
      content: body.content || undefined,
    }})

   console.log(res);
   c.status(200);
   return c.json({success: true, message: "Blog Successfully Updated!"});
});

export default blog