/*
  An Express route for retrieving country codes.
*/
// Public npm libraries
import express from 'express';
class CountryCodeRouter {
    constructor(countries) {
        this.countries = countries;
        this.router = express.Router();
        // Bind the 'this' object to all class subfunctions
        this.errorHandler = this.errorHandler.bind(this);
        this.root = this.root.bind(this);
        this.getCountryCode = this.getCountryCode.bind(this);
        // Define routes
        this.router.get('/', this.root);
        this.router.get('/:country', this.getCountryCode);
    }
    errorHandler(err, res) {
        console.log('CountryCode errorHandler(): ', err);
        res.status(500);
    }
    root(req, res, next) {
        return res.json({ status: 'country-code' });
    }
    getCountryCode(req, res, next) {
        const country = req.params.country.toLowerCase();
        console.log('country: ', country);
        console.log('req.params: ', req.params);
        // console.log('this.countries: ', this.countries)
        for (let i = 0; i < this.countries.length; i++) {
            const thisEntry = this.countries[i];
            const name = thisEntry.name.toLowerCase();
            if (name === country) {
                // console.log(`Match for ${name} found.`)
                const outObj = Object.assign({}, { match: true }, thisEntry);
                return res.json(outObj);
            }
        }
        return res.json({ match: false });
    }
}
export default CountryCodeRouter;
