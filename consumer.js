const amqp = require('amqplib')

// Create a Connection
async function connect() {
  try {
    // Connect using TCP Connection
    const connection = await amqp.connect('amqp://localhost:5672') // return promise

    // Create a channel for communicate with RabbitMQ Server
    const channel = await connection.createChannel() // return promise

    // Make sure the queue exist on server
    const result = await channel.assertQueue('jobs')

    channel.consume('jobs', message => {
      const userInput = message.content.toString()
    })

    // Keep the consumer running
    console.log('Waiting for message...')
  } catch (e) {
    console.error(e)
  }
}

connect()
