/**
 *
 *   ______________                  _______________
 *  |             |     (channel)   |             |
 *  |  Publisher  |  =============> |   Server    |
 *  |_____________|                 |_____________|
 *
 */

// Before start, We need to start RabbitMQ Server (using Docker)
// $ docker container run -p 5672:5672 --name rabbitmq rabbitmq

const amqp = require('amqplib')

// Mock data for send

const userInput = process.argv[2]
const msg = { text: userInput }

// Create a Connection
async function connect() {
  try {
    // Connect using TCP Connection
    const connection = await amqp.connect('amqp://localhost:5672') // return promise

    // Create a channel for communicate with RabbitMQ Server
    const channel = await connection.createChannel() // return promise

    // Make sure the queue exist on server
    const result = await channel.assertQueue('jobs')

    // Send something jobs queue using Buffer
    channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)))

    console.log(`Job sent successfully: ${msg.text}`)
  } catch (e) {
    console.error(e)
  }
}

connect()
