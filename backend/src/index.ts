import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
   }
}>()

app.use(cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/blogs", async(c)=>{
  const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL,
 }).$extends(withAccelerate());

 const res = await prisma.post.findMany({where: {}});
 return c.json(res);
})

app.route('/api/v1/blog/',blog);

app.route('/api/v1', user);

export default app
