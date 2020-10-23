const fs = require('fs');
const puppeteer = require('puppeteer');

const { urls } = require('./urls.json');

async function main() {
  const browser = await puppeteer.launch();

  const data = [];

  for (url of urls) {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUtil: 'load'
    });

    await page.waitFor(3000);
    
    const hoverImages =
      await page.$$('#OpenLayers\\.Layer\\.GML_32_vroot image');

    for (index in hoverImages) {
      const selector =
        hoverImages[index]._remoteObject.description.replace(/\./gim, '\\.');
      await page.hover(selector);

      const pageData = await page.evaluate(() => {
        const workarea =
          document.querySelector('#popupid_contentDiv > table tbody');
        const assetID = workarea
          .querySelector('tr:nth-of-type(1) td:nth-of-type(1)')
          .textContent
          .replace('Hourly Averages', '');
        const pollutants = workarea
          .querySelector('tr:nth-of-type(2) td:nth-of-type(1)')
          .textContent;

        const data = [];

        const dataHeaders = workarea
          .querySelectorAll('tr:nth-of-type(4) tr:nth-of-type(1) td');
        
        const headers = [];
        dataHeaders.forEach((elm) => {
          headers.push(elm.textContent);
        });

        const dataRows = document
          .querySelectorAll('#popupid_contentDiv > table tbody > tr:nth-of-type(4) tr:nth-of-type(n+2)');

        dataRows.forEach((row) => {
          const col = row.querySelectorAll('td');
          const outData = {};

          col.forEach((elm, index) => {
            outData[headers[index]] = elm.textContent
          });

          data.push(outData);
        });

        return {
          assetID,
          pollutants,
          data
        };
      });

      data.push(pageData);
    }

    page.close();
  }
  
  browser.close();

  fs.writeFileSync('output.json', JSON.stringify(data));
}

main();
