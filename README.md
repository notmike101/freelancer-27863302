# Freelancer Project 27863302

## Project Description

I want to make a web scraper using cheerio and lodash. https://airquality.environment.nsw.gov.au/aquisnetnswphp/map44.php


You can check this given link. On a map there are 6 stations. I want to get data of 6 stations like:

const assetID = station name


const date = date


const value = value of the polutants like pm2.5, pm10


const pollutants = name of the polutant


for each and every station.


PS: try to use cheerio and lodash npm packages not any other.

## Setup

1. Run `npm install`
2. Edit `urls.json` for a list of URLs you want to scrape

## Running

`npm run scrape`

This will output a file `output.json`.

## Packages Used

* Puppeteer - Required to interact with DOM after parsed.
  * Note, this library is what you want to use.  We can inject jQuery into this to use functionality similar to Cheerio