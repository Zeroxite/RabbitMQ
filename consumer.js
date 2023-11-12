const amqp = require('amqplib');

async function consumeMessage() {
  const connection = await amqp.connect('amqp://localhost:5673/');
  const channel = await connection.createChannel();

  const queueName = 'queue1';

  await channel.assertQueue(queueName, { durable: true });
  console.log(`Esperando mensajes en la cola: ${queueName}`);

  channel.consume(queueName, (message) => {
    if (message !== null) {
      console.log(`Mensaje recibido: ${message.content.toString()}`);
      channel.ack(message);
    }
  });
}

consumeMessage();