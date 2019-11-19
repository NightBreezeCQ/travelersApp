

import config from '../config/index'

import * as Knex from 'knex'

let knex = Knex(config.knex)


export default knex

