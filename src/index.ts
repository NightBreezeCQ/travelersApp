
import { travelers, TravelersOption, Req, Res, NextFunction } from "travelers";
import * as apis from "./apis/index";
import * as srvs from "./srvs/index";
import controllers from "./controllers/index";
import config from "./config/index";
import { needAuth } from "./security";
// import * as mq from "./srvs/mq";
import * as cluster from "cluster";
import * as os from "os";
import * as express from "express";
import * as path from "path";

const option: TravelersOption = {
    config,
    before: function (app) {
    },
    ready: function (app, srvs) {
        // mq.run(srvs);
        console.log('````````')
        app.use('/public', express.static(path.join(__dirname, "../public")));
    },
    srvs,
    security: { needAuth },
    apis,
    controllers,
    after: function (app, srvs) {
        app.use((req: Req, res: Res) => {
            const { codes } = req.srvs;
            return codes.notfind.resJson(res);
        });
    }
};

if (cluster.isMaster) {
    const cpuNum = os.cpus().length
    for (let i = 0; i < 1; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log("worker process died,id", worker.process.pid);
        cluster.fork();
    });

} else {
    console.log('启动服务')
    travelers(option).then(data => {
        // console.log(JSON.stringify(data, null, 4));
    });
}



