
#### travel
1. api 目录下是接口名编写及参数验证
2. controllers 下来是逻辑处理
3. 数据库才用knex库，官网https://knexjs.org/

#### 使用
1. 安装
```
npm i travel
```
2. 使用
```
const option: TravelOption = {
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

  }
}
travel(option)
```



