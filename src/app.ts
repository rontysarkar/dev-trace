import express, { type Request, type Response } from 'express'
import { authRoute } from './api/auth/auth.route';

const app = express();

app.use(express.json());

app.use('/api/auth',authRoute)

app.get('/',(req:Request,res:Response)=>{
    res.send("Hello World")
})



export default app;