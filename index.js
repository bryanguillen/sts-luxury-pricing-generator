/**
 * @description Main script/server script that runs
 * the application.
 *
 * @author Bryan Guillen
 */

/**********************
 * Variables
 ***********************/

// Imports
const addPricesToCsv = require('./reportPrices/addPricesToCsv');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const inspect = require('util').inspect;
const upload = multer({ dest: 'csvUploads/' });
// Instance(s)
const app = express();
// // Server Config Constants
const CSV_UPLOADS_ENDPOINT = '/csvUploads';
const PORT = 8080;
// Frontend coupled/element name(s)
const CSV_FILE_INPUT_FIELD_NAME = 'csv-input-field';

/**********************
 * Middleware
 ***********************/

// For serving the static files
app.use('/', express.static('client/'));

app.post(CSV_UPLOADS_ENDPOINT, upload.single('csv-file-upload'), function(req, res) {
  const file = req.file;
  const filePath = file.path;

  addPricesToCsv(filePath)
  .then(() => {
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
      if (err) throw new Error(err);
      fs.writeFile(filePath + '.csv', data, (err) => {
        if (err) throw new Error(err);
        res.send(filePath + '.csv');
      })
    })
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

app.get('/csvUploads/:fileHash', (req, res) => {
  const fileHash = req.params.fileHash;
  res.status(200).sendFile(__dirname + '/csvUploads/' + fileHash);
});

/**********************
 * Start server
 ***********************/

app.listen(PORT, () => {
  console.log('Server is now listening on port', PORT);
});
