import { Hono } from "hono";
const user = new Hono();

user.get("/signup", (c)=>c.text("User Created Successfully"));

user.get("/signin", (c)=>c.text("User LoggedIN"));

export default user;