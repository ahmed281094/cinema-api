import 'dotenv/config';
import express from 'express';
import userRouter from './modules/user/user.routes.js';
import { globalErrorHandling } from './utilits/error/errorHandling.js';
import moviesRouter from './modules/movies/movies.routes.js';
import hallsRouter from './modules/halls/halls.routes.js';



const app = express();
app.use(express.json());
app.use("/users",userRouter)
app.use("/movie",moviesRouter)
app.use("/halls",hallsRouter)
app.use(globalErrorHandling)
const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
