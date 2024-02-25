import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/blog', blog);

app.route('/api/v1', user);

export default app
