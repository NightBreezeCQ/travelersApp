
import { travelers, travelersOption,Response,Request,NextFunction,Config } from "travelers";
import * as apis from "./apis/index";
import * as srvs from "./srvs/index";
import * as controllers from "./controllers/index";
import config from "./config/index";

const option: travelersOption = {
    config,
    before: function (app) {
    
    },
    srvs,
    args: {
        apis,
        controllers,
    },
    after: function (app) {
        app.use((req: Request, res: Response) => {
            const { codes } = req.srvs;
            return codes.notfind.resJson(res);
        });
    }
};

travelers(option);
