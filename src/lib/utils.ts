
import { Srvs } from "travelers";
export async function log(srvs: Srvs, param: string) {
    const { logger } = srvs;
    logger.info(param);
}