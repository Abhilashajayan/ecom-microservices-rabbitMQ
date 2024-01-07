import amqp from 'amqplib';

let connection: amqp.Connection | null = null;

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    try {
        connection = await amqp.connect(amqpServer);
        console.log("Connected to RabbitMQ");
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
    }
}

function getChannel() {
    if (!connection) {
        throw new Error("RabbitMQ connection not established");
    }
    return connection.createChannel();
}
async function declareQueue(queueName:string) {
    const channel = await getChannel();
    await channel.assertQueue(queueName);
}

export default {
    connect,
    getChannel,
    declareQueue,
};
