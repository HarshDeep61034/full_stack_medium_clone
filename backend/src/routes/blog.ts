import { Hono } from "hono";
const blog = new Hono();

blog.get("/", (c)=>c.text("YE lo blog!!"));

blog.put("/", (c)=>c.text("Blog eddited"));

blog.put("/", (c)=>c.text("Blog eddited"));



blog.get("/:id", (c) => {
    const id = c.req.param('id');
   return  c.text('blog number ' + id);

});

export default blog