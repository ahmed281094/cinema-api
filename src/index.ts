import 'dotenv/config';
import express from 'express';
import userRouter from './modules/user/user.routes.js';
import { globalErrorHandling } from './utilits/error/errorHandling.js';



const app = express();
app.use(express.json());
app.use("/users",userRouter)
app.use(globalErrorHandling)
const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
