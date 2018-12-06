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
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');
const inspect = require('util').inspect;
const path = require('path');
const upload = multer({ dest: 'csvUploads/' });

const app = express();

const PORT = 8080;
const CSV_FILE_INPUT_FIELD_NAME = 'csv-input-field';

/**********************
 * Middleware
 ***********************/

/**
 * @description Log HTTP layer
 */
app.use(morgan('common'));

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
  .then((newFile) => {
    // HACK!!!!!!!
    res.send(newFile);
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
app.get('/csvUploads/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const file = path.join(__dirname + '/csvUploads/' + fileName);

  res.status(200).sendFile(file, (err) => {
    if (err) {
      throw new Error(err);
    }

    fs.unlink(file, (error) => {
      if (error) {
        throw new Error(error);
      }
    });
  });
});

/**********************
 * Start server
 ***********************/

/**
 * Use logical statement in order to
 * allow for environment variable that
 * hosting environments set (i.e. heroku)
 */
app.listen(process.env.PORT || PORT, () => {
  console.log('Server is now listening');
});
