
import { travelers, TravelersOption, Req, Res, NextFunction } from "travelers";
import * as apis from "./apis/index";
import * as srvs from "./srvs/index";
import controllers from "./controllers/index";
import config from "./config/index";
import * as security from "./security";
import * as mq from "./srvs/mq";

const option: TravelersOption = {
    config,
    before: function (app) {

    },
    ready: function (app, srvs) {
        mq.run(srvs);
    },
    srvs,
    security,
    apis,
    controllers,
    after: function (app, srvs) {
        app.use((req: Req, res: Res) => {
            const { codes } = req.srvs;
            req.srvs.loggerInfo.info("eeeeee");
            return codes.notfind.resJson(res);
        });
    }
};

travelers(option).then(data => {
    // console.log(JSON.stringify(data, null, 4));
});

