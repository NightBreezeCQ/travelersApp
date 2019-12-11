
import { Req, Res, NextFunction } from "travelers";


export async function needAuth(req: Req, res: Res, next: NextFunction) {
    console.log("开始验证");
    next();
}