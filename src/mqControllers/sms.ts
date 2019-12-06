
import { Srvs } from "travelers";

export async function sms(srvs: Srvs) {
    const { knex,redis } = srvs;
    console.log("收到队列············");
}
