// const listingData = require('./data/listings.json')
const { parse } = require('json2csv');
const fs = require('fs')

const saveFiles = (data, name) => {
  try {
    const csv = parse(data);
    fs.writeFileSync(`./data/${name}-listings.csv`, csv, (err) => {
      if (err) throw err;
      console.log("CSV FILE SAVED");
    })

  } catch (err) {
    console.error(err);
  }

  try {
    fs.writeFile(`./data/${name}-listings.json`, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("JSON FILE SAVED");
    })
  } catch (err) {
    console.error(err);
  }

  return `/data/${name}-listings.csv`
}

module.exports = { saveFiles }