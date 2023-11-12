const amqp = require('amqplib');

async function sendMessage() {
  const connection = await amqp.connect('amqp://localhost:5672/');
  const channel = await connection.createChannel();

  const queueName = 'queue1';

  const message = 'Hola mundo!';

  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

  console.log(`Mensaje enviado: ${message}`);

  setTimeout(() => {
    connection.close();
  }, 500);
}

sendMessage();