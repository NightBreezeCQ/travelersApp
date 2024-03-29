import { Code, Res, Logger } from "travelers";
import * as bcrypt from "./srvs/bcrypt";
import * as Knex from "knex";
import Redis from "ioredis";
import code from "./srvs/code";

import config from "./config/index";

const allCode = {
    ...code,
    ...Code
};


type CodeErr<T> = {
    [k in keyof T]: {
        resJson: (res: Res, args?: { [key: string]: string }) => void
    }
}

type Codes = CodeErr<typeof allCode>
type Bcrypt = typeof bcrypt
type $Config = typeof config

declare global {
    namespace Travelers {
        interface Srvs {
            codes: Codes
            knex: Knex
            bcrypt: Bcrypt
            logger: Logger
            loggerError: Logger
            loggerInfo: Logger
            $config: $Config
            redis: Redis.Redis
        }
    }
}

