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
    // HACK!!!!!!!
    res.send(filePath + '.csv');
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * @description GET endpoint which sends the client the
 * file in order to download from browser. Additionally,
 * it deletes the file from the server given that it
 * is no longer needed once the user downloads new file.
 */
app.get('/csvUploads/:fileHash', (req, res) => {
  const fileHash = req.params.fileHash;
  const fileRelativePath = '/csvUploads/' + fileHash; // relative from root
  res.status(200).sendFile(__dirname + fileRelativePath, (err) => {
    if (err) {
      throw new Error(err);
    }

    fs.unlink(__dirname + fileRelativePath, (error) => {
      if (error) {
        throw new Error(error);
      }
    });
  });
});

/**********************
 * Start server
 ***********************/

app.listen(PORT, () => {
  console.log('Server is now listening on port', PORT);
});
