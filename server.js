const express = require('express')
require('dotenv').config()
const logger = require('morgan')
const app = express()
const fs = require('fs')

const getAllListings = require('./getListingData')
const { saveFiles } = require('./saveFiles')

app.use(logger("dev"))

app.get("/all", (req, res) => {
  console.log("object")
})

app.get('/create-csv', (req, res) => {
  console.log("Creating JSON");
  console.log(req.query.status)
  const fileName = req.query.status
  //Get all the listings from flippa
  /**
   * @param {string} status
   * @param {number} page
   */
  getAllListings(req.query.status, 1).then(data => {
    //Save CSV and JSON File
    return saveFiles(data, fileName)

  }).then(file => {
    res.download(`${__dirname}/${file}`)
  })
})

app.get('/download', (req, res) => {
  const dataFolder = `${__dirname}/data/`

  console.log(dataFolder)
  fs.readdir(dataFolder, (err, files) => {
    console.log(files)
    // files.forEach(file => {
    //   res.download(file);
    // });
    res.download(`${dataFolder}/${files[0]}`)
  });
})


app.listen(process.env.PORT || 9000, () => {
  console.log(`Listening on ${process.env.PORT}`);
})