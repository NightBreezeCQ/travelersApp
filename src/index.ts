
import { travelers, travelersOption } from 'travelers'
import * as  apis from './apis/index'
import * as  srvs from './srvs/index'
import * as controllers from './controllers/index'
import config from './config/index'
import * as cors from 'koa2-cors'

const option: travelersOption = {
  config,
  before: function (app) {
    app.use(cors());
  },
  srvs,
  args: {
    apis,
    controllers,
  },
  after: function (app, obj: any) {
    // console.log(JSON.stringify(obj.swagger))

    // app.use(bodyparser({
    //   enableTypes: ['json', 'form', 'text']
    // }))

    // app.use(json())
    // app.use(logger())

  }
}


travelers(option)
