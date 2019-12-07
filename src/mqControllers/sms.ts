
import { Srvs } from "travelers";

export async function helloKoalaQueue(srvs: Srvs) {
    const { knex, redis } = srvs;
    srvs.logger.info("收到队列············");
}
