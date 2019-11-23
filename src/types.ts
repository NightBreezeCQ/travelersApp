import { Code ,Response} from "travelers";
import * as bcrypt from "./srvs/bcrypt";
import * as Knex from "knex";
import code from "./srvs/code";

import config from "./config/index";

const allCode = {
    ...code,
    ...Code
};


type CodeErr<T> = {
    [k in keyof T]: {
        resJson: (res: Response, args?: { [key: string]: string }) => void
    }
}

type Codes = CodeErr<typeof allCode>
type Bcrypt = typeof bcrypt
type Config = typeof config

declare global {
    namespace travelers {
        interface Srvs {
            codes: Codes
            knex: Knex
            bcrypt: Bcrypt
            $config: Config
        }
    }
}

declare global {
    namespace travelers {
        interface q {

        }
    }
}
