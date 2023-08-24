/*
  This library is used to scrape country code data from Wikipedia, as per this example article:
  https://www.freecodecamp.org/news/how-to-scrape-websites-with-node-js-and-cheerio/
*/
import cheerio from 'cheerio';
// import pretty from 'pretty'
import axios from 'axios';
const URL = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3';
class CountryCodeScraper {
    async getData() {
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        // console.log(pretty($.html()))
        // Select all the list items in plainlist class
        const listItems = $('.plainlist ul li');
        // Array to hold country objects.
        const countries = [];
        // Use .each method to loop through the li we selected
        listItems.each((idx, el) => {
            // type country = {
            //   name: string,
            //   iso3: string
            // }
            // Object holding data for each country/jurisdiction
            const country = { name: '', iso3: '' };
            // const country = {}
            // Select the text content of a and span elements
            // Store the textcontent in the above object
            country.name = $(el).children('a').text();
            country.iso3 = $(el).children('span').text();
            // console.log(country)
            // Populate countries array with country data
            countries.push(country);
        });
        return countries;
    }
}
export default CountryCodeScraper;
