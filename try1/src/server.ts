import express from 'express'
import { Sequelize } from 'sequelize'
import { initUser } from './models/User'

console.log('Starting application')

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  // Uncomment if you don't want to see the executed SQL requests in the logs
  // logging: false,
})

// Uncomment this if you want to create the User table
// initUser(sequelize)

const sequelizeReady = sequelize.sync({ alter: true })

const app = express()

app.get('/test', async (req, res) => {
  await sequelizeReady
  const [results] = await sequelize.query(`SELECT 'Hello World!' AS "data";`)
  res.send(results)
})

app.use(express.static('static'))

const port = 3000
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const shutdown = async () => {
  server.close()
  await sequelize.close()
}

process.once('SIGTERM', async function () {
  console.log('Stopping application')
  await shutdown()
  process.exit()
})
