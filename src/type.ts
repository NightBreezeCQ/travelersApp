import { Code } from 'travel'
import * as  bcrypt from './srvs/bcrypt'
import * as Knex from 'knex'
import code from './srvs/code'

import config from './config/index'

const allCode = {
    ...code,
    ...Code
}


type CodeErr<T> = {
    [k in keyof T]: any
}

type Codes = CodeErr<typeof allCode>
type Bcrypt = typeof bcrypt
type Config = typeof config

declare global {
    namespace Travel {
        interface Srvs {
            codes: Codes
            knex: Knex
            bcrypt: Bcrypt
            $config: Config
        }
    }
}

