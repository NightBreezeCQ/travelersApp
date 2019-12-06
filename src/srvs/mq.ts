import * as amqp from "amqplib";
import * as srvs from "./index";
import config from "../config/index";
import * as mqControllers from "../mqControllers/index";

let smsChannel: amqp.Channel;

const mq = {
    producer: {
        sms: smsChannel
    },
    consumer: {}
};

async function consumer() {
    // 创建链接对象
    const connection = await amqp.connect({
        protocol: "amqp",
        hostname: "localhost",
        port: 5672,
        username: "admin",
        password: "admin",
        locale: "en_US",
        frameMax: 0,
        heartbeat: 0,
        vhost: "my_vhost",
    });

    // 获取通道
    const channel = await connection.createChannel();

    // 声明参数
    // const exchangeName = 'fanout_koala_exchange';
    const queueName = "helloKoalaQueue";
    // const routingKey = 'qqq';

    // 声明一个交换机
    // await channel.assertExchange(exchangeName, 'fanout', { durable: true });

    // 声明一个队列
    // await channel.assertQueue(queueName);

    // 绑定关系（队列、交换机、路由键）
    // await channel.bindQueue(queueName, exchangeName, routingKey);

    // 消费
    await channel.consume(queueName, msg => {
        console.log("Consumer：", msg, msg.content.toString());
        if (mqControllers[queueName]) mqControllers[queueName](srvs);
        channel.ack(msg);
    });

    console.log("消费端启动成功！");
}

async function producer() {
    // 创建链接对象
    const connection = await amqp.connect(config.mq);

    // 获取通道
    const channel = await connection.createChannel();

    // 声明参数
    const exchangeName = "helloKoalaQueue";
    const routingKey = "test";
    const msg = "hello koala";

    // 交换机
    // await channel.assertExchange(exchangeName, "fanout", {
    //     durable: true,
    // });

    mq.producer.sms = channel;
    // 发送消息
    // for (let index = 0; index < 10; index++) {
    //     await channel.publish(exchangeName, routingKey, Buffer.from(msg + index));
    // }

    // // 关闭链接
    // await channel.close();
    // await connection.close();
}

producer();
consumer();

setTimeout(() => {
    mq.producer.sms.publish("", "helloKoalaQueue", Buffer.from("........."));
    mq.producer.sms.publish("", "helloKoalaQueue1", Buffer.from("........."));
}, 2000);

export default mq;