
import { Request, Response } from "travelers";

export async function everyDay_list(req: Request, res: Response) {
    let { body, srvs } = req;
    const { knex, codes } = srvs;
    codes.ok.resJson(res);
}

export async function everyDay_award(req: Request, res: Response) {
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


export async function time_put(req: Request, res: Response) {
    
    let { body, params } = req;
    const {knex} = req.srvs;
    let { id } = params;
    let { title, start_time, end_time } = body;
    let activity_time = await knex("activity_time").where({ id }).first();
    if (!activity_time) {
        res.send ({
            code: 200, msg: "id不存在"
        }); 
        return;
    }
    await knex("activity_time").update(body).where({ id });
    res.send({
        code: 200, msg: "修改成功"
    }); 
}
