// Public npm libraries
import express from 'express'
import axios from 'axios'

class PriceRouter {
    // Types
    router: express.Router
    axios: any

    constructor() {
        // Encapsulate dependencies
        this.router = express.Router()
        this.axios = axios

        // Bind the 'this' object to all class subfunctions
        this.errorHandler = this.errorHandler.bind(this)
        this.root = this.root.bind(this)
        this.getBchPrice = this.getBchPrice.bind(this)

        // Define routes
        this.router.get('/', this.root)
        this.router.get('/bch', this.getBchPrice)
    }

    errorHandler(err, res) {
        res.status(500)
    }

    root(req, res, next) {
        return res.json({ status: 'price' })
    }

    async getBchPrice(req, res, next) {
      try {
        const opt = {
            method: 'get',
            baseURL: 'https://api.coinbase.com/v2/exchange-rates?currency=BCH',
            timeout: 15000
        }

        const response = await this.axios.request(opt)

        const bchUsdPrice = Number(response.data.data.rates.USD)

        return res.json({bchUsdPrice})
      } catch(err) {
        console.log('err: ', err)

        console.error('Error in getBchPrice(): ', err)
        return this.errorHandler(err, res)
      }
    }
}

export default PriceRouter
