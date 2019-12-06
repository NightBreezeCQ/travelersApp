export default {
    port: 80,
    host: "0.0.0.0",
    swaggerConfig: {
        swagger: "2.0",
        info: {
            title: "接口文档",
            description: "swagger defalut",
            version: "1.0.0"
        },
        host: "127.0.0.1:3000",
        basePath: "",
        schemes: ["http", "https"],
        produces: ["application/json"],
        security: [
            {
                "bearerAuth": []
            }
        ]
    },
    swaggerPath: "/api/swagger",
    knex: {
        client: "mysql", //指明数据库类型，还可以是mysql，sqlite3等等
        connection: { //指明连接参数
            host: "127.0.0.1",
            user: "root",
            password: "password",
            database: "aifenglife"
        },
        debug: false, //指明是否开启debug模式，默认为true表示开启
        pool: { //指明数据库连接池的大小，默认为{min: 2, max: 10}
            min: 2,
            max: 20,
        },
        acquireConnectionTimeout: 10000, //指明连接计时器大小，默认为60000ms
        migrations: {
            tableName: "migrations" //数据库迁移，可选
        }
    },
    redis: {
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: "password",
        db: 0
    },
    mq:{
        protocol: "amqp",
        hostname: "localhost",
        port: 5672,
        username: "admin",
        password: "admin",
        locale: "en_US",
        frameMax: 0,
        heartbeat: 0,
        vhost: "my_vhost",
    }
};