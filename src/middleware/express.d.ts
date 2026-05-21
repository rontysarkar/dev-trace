import type { ReqUser } from "../types";

declare global {
    namespace Express {
        interface Request {
            user : ReqUser;
        }
    }
}