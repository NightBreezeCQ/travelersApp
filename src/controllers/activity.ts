
import { Req, Res } from "travelers";

export async function everyDay_list(req: Req, res: Res) {
    let { body, srvs } = req;
    const { knex, codes } = srvs;
    req.srvs.
    codes.ok.resJson(res);
}

export async function everyDay_award(req: Req, res: Res) {
    let { params, srvs, body } = req;
    const { knex } = srvs;
    let { id } = params;
    let { player } = body;

    let everyday_activity = await knex("everyday_activity").where({ id }).first();

    if (!everyday_activity) {
        res.send({ code: 400, msg: "id不存在" });
        return;
    }

    let date = new Date();
    let datestr = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    let everyday_activity_record = await knex("everyday_activity_record").where({ datestr, player }).first();
    if (everyday_activity_record) {
        res.send({ code: 400, msg: "你已经领取今日活动奖品" });
        return;
    }
}


