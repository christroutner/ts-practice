# scrape-api

This is a typescript example. At startup, the app scrapes data from Wikipedia using Cheerio, as per this example:
- https://www.freecodecamp.org/news/how-to-scrape-websites-with-node-js-and-cheerio/

It then creates a REST API GET endpoint using express.js that a user can query to retrieve a country code.