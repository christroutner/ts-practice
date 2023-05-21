// Public npm libraries
import express from 'express'

// Local libraries

class PriceRouter {
    // Types
    router: express.Router

    constructor() {
        // Encapsulate dependencies
        this.router = express.Router()

        // Define routes
        this.router.get('/', this.root)
        this.router.get('/bch', this.getBchPrice)

        // Bind the 'this' object to all class subfunctions
        this.errorHandler = this.errorHandler.bind(this)
        this.root = this.root.bind(this)
        this.getBchPrice = this.getBchPrice.bind(this)
    }

    errorHandler(err, res) {
        res.status(500)
    }

    root(req, res, next) {
        return res.json({ status: 'price' })
    }

    async getBchPrice(req, res, next) {
        try {

        } catch(err) {
            console.error('Error in getBchPrice()')
            return this.errorHandler(err, res)
        }
    }
}

export default PriceRouter

