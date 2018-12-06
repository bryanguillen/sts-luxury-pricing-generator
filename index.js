/**
 * @description Main script/server script that runs
 * the application.
 *
 * @author Bryan Guillen
 */

/**********************
 * Variables
 ***********************/

const addPricesToCsv = require('./reportPrices/addPricesToCsv');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const inspect = require('util').inspect;
const upload = multer({ dest: 'csvUploads/' });

const app = express();

const PORT = 8080;
const CSV_FILE_INPUT_FIELD_NAME = 'csv-input-field';

/**********************
 * Middleware
 ***********************/

/**
 * @description For serving the static files
 */
app.use('/', express.static('client/'));

/**
 * @description POST end point for uploading
 * file to server. This endpoint is essentially
 * a wrapper for entire application logic.
 * Note: It sends the user the file path relative
 * to the project root. It does this because the frontend
 * needs the relative URL for the new file, so that it could
 * request for download. For more on this, please view the frontend 'app.js' code.
 */
app.post('/csvUploads', upload.single(CSV_FILE_INPUT_FIELD_NAME), function(req, res) {
  const file = req.file;
  const filePath = file.path;

  addPricesToCsv(filePath)
  .then(() => {
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
      if (err) throw new Error(err);
      fs.writeFile(filePath, data, (err) => {
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

/**
 * @description GET endpoint which sends the client the
 * file in order to download from browser.
 */
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
