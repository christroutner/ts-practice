/*
    Class library for the REST API server
*/

// Public npm libraries
import express, { Express } from 'express'
import { Sequelize } from 'sequelize'
// import { initUser } from './models/User'

// Local libraries
import PriceRouter from './routes/price.js'
import CountryCodeScraper from './lib/scrape-country-code.js'
import CountryCodeRouter from './routes/country-code.js'

class ServerLib {
  // Types
  app: Express
  server: any
  sequelize: Sequelize
  priceRouter: any
  countryCodeRouter: any

  constructor () {
    // State
    this.app = express()
    this.server = null // placeholder
    // this.sequelize = null // placeholder

    // Encapsulate dependencies
    this.priceRouter = new PriceRouter()

    // Bind the 'this' object to all class subfunctions
    this.start = this.start.bind(this)
    this.addRouters = this.addRouters.bind(this)
    this.shutdownPostgres = this.shutdownPostgres.bind(this)
  }

  // Start the server.
  async start (): Promise<void> {
    try {
      console.log('Starting application')

      // Scrape the data from the webpage before staring the webserver.
      const countryCodeScraper = new CountryCodeScraper()
      const countries = await countryCodeScraper.getData()
      console.log('Scraped country code data from Wikipedia.')

      // Instantiate the country-code route with the data
      this.countryCodeRouter = new CountryCodeRouter(countries)

      // Start the PostreSQL database.
      this.sequelize = new Sequelize({
        dialect: 'postgres',
        database: 'postgres',
        username: 'root',
        password: 'secret',
        host: '127.0.0.1',
        port: 5432
        // Uncomment if you don't want to see the executed SQL requests in the logs
        // logging: false,
      })

      // Uncomment this if you want to create the User table
      // initUser(sequelize)

      // Wait for the database connection to finish.
      await this.sequelize.sync({ alter: true })

      // Deliver static content
      this.app.use(express.static('static'))

      // Attach REST API routers
      this.addRouters()

      // Start the express server.
      const port = 3001
      this.server = this.app.listen(port, () => {
        console.log(`App listening on port ${port}`)
      })

      // Add a handler when SIGTERM signal is sent by user using keyboard.
      process.once('SIGTERM', function () {
        console.log('Stopping application')
        this.shutdownPostgres().then(() => {}).catch((err) => { console.log(err) })
        process.exit()
      })
    } catch (err) {
      // Top level function. Throw the error to stop the app.
      console.error('Error trying to start server: ', err)

      // Close the connection to the database.
      this.shutdownPostgres().then(() => {}).catch((err) => { console.log(err) })
    }
  }

  // Attach router endpoints
  addRouters (): void {
    // this.app.get('/test', async (req: Request, res: Response) => {
    //   const [results] = await this.sequelize.query('SELECT \'Hello World!\' AS "data";')
    //   res.send(results)
    // })

    // Attach the router libraries
    this.app.use('/price', this.priceRouter.router)
    this.app.use('/countrycode', this.countryCodeRouter.router)
  }

  async shutdownPostgres (): Promise<void> {
    this.server.close()
    await this.sequelize.close()
  }
}

export default ServerLib
