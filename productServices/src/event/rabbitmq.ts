import amqp from 'amqplib';

let connection:any = null;

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    console.log("Connected to RabbitMQ");
}

function getChannel() {
    if (!connection) {
        throw new Error("RabbitMQ connection not established");
    }
    return connection.createChannel();
}

export default {
    connect,
    getChannel,
};
