import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { bookRouter } from './routes/blog';

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

app.route('/api/v1/user', userRouter)
app.route('/api/v1/book', bookRouter)

<<<<<<< HEAD
export default app
=======
export default app
>>>>>>> 315af2e5e90167a6397f20e1630c7e247c3a1ade
