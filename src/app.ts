import express, { type Request, type Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issue/issue.route";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/auth", authRoute);
app.use("/api/issues", issueRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;
