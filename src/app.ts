import express, { type Request, type Response } from 'express'
import { authRoute } from './api/auth/auth.route';
import { issueRoute } from './api/issue/issue.route';

const app = express();

app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/issues',issueRoute);

app.get('/',(req:Request,res:Response)=>{
    res.send("Hello World")
})



export default app;