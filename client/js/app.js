/**
 * @description Main script that contains
 * all of the proprietary logic for the frontend.
 * The file is split into five individual subcomponents:
 * - Variables
 * - Utils
 * - State mgmt
 * - DOM manipulation
 * - Event Handlers
 *
 * @author Bryan Guillen
 */

/**********************
 * Variables
 ***********************/

// Selectors
var SEND_CSV_BUTTON_SELECTOR = '#send-csv-button';
var CSV_INPUT_FIELD_SELECTOR = '#csv-input-field';
var CSV_FILE_UPLOAD_FORM_SELECTOR = '.csv-file-upload-form';
var LOADING_SELECTOR = '.loading';
var LOADING_DOT_SELECTOR = '.loading-dot';
var ERROR_MESSAGE_CONTAINER_SELECTOR = '.error-message-container';
var TRY_AGAIN_BUTTON_SELECTOR = '#try-again-button';

// Events
var CLICK = 'click';

// Others
var CSV_INPUT_FIELD = 'csv-input-field';

/**********************
 * Utils
 ***********************/

function isCsvFile(fileName) {
  var parsedName = fileName.split('.');
  return parsedName[1] === 'csv';
}

/**
 * @description Function used for sending file
 * to server.
 */
function sendFile(file) {
  var formData = new FormData();

  /**
   * Add to form data, since server requires
   * multipart request
   */
    formData.append(CSV_INPUT_FIELD, file, file.name);

  $.ajax({
      type: 'POST',
      url: '/csvUploads',
      success: function (fileUrl) {
          var loadingTextElement = $(LOADING_SELECTOR);
          var csvFileUploadingContainer = $(CSV_FILE_UPLOAD_FORM_SELECTOR);

          // download updated file
          window.open(fileUrl);

          /**
           * The next few lines of
           * code simply undo all of
           * what showLoading() does
           * in order to restore previous state
           */

          // stop the animations
          state.loadingDotsAnimated = false;

          // show csv file upload form (i.e. container)
          csvFileUploadingContainer.css('display', 'block');

          // hide loading container
          loadingTextElement.css('display', 'none');

          clearCsvInputFieldVal();
      },
      error: function (error) {
        var loadingTextElement = $(LOADING_SELECTOR);
        var errorMessageContainer = $(ERROR_MESSAGE_CONTAINER_SELECTOR)

        /**
         * NOTE: THE CODE WITHIN THIS FILE
         * IS ESSENTIALLY THE SAME (SEE TODO
         * COMMENT ABOVE FOR ACTION ITEM)
         */

        /**
         * The next few lines of
         * code simply undo all of
         * what showLoading() does
         * in order to restore previous state
         */

        // stop the animations
        state.loadingDotsAnimated = false;

        // show error message (Note, this is currently generic)
        errorMessageContainer.css('display', 'block');

        // hide loading
        loadingTextElement.css('display', 'none');

        clearCsvInputFieldVal();
      },
      async: true,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      timeout: 120000
    });
}

/**
 * @description Function used for generating
 * a selector that chooses the nth of that type within jQuery
 * (e.g. get the third element of type '.hello' ->
 * $('.hello:eq(2)')).
 */
function generateEqSelector(selector, index) {
  return selector + ':eq(' + index + ')';
}

/**********************
 * State mgmt
 ***********************/

var state = {
  loadingDotsAnimated: false
};

/**********************
* DOM manipulation
***********************/

/**
 * @description Wrapper to make it clear
 * what is going on within program.
 */
function animateLoading() {
  return animateLoadingDot(0);
}

function animateLoadingDot(dotIndex) {
  var loadingDots = $(LOADING_DOT_SELECTOR);
  var index = dotIndex !== undefined ? dotIndex : 0;
  var dotSelector;
  var dot;

  if (state.loadingDotsAnimated) {
    dotSelector = generateEqSelector(LOADING_DOT_SELECTOR, index);
    dot = $(dotSelector);
    dot.hide(2500, function() {
      var newIndex;

      // Check if last loading dot
      if (index + 1 === loadingDots.length) {
        newIndex = 0;
      } else {
        newIndex = index + 1;
      }

      // show hidden dot
      dot.show();

      animateLoadingDot(newIndex);
    });
  }
}

function clearCsvInputFieldVal() {
  $(CSV_INPUT_FIELD_SELECTOR).val('');
}

function showLoading() {
  var loadingTextElement = $(LOADING_SELECTOR);
  var csvFileUploadingContainer = $(CSV_FILE_UPLOAD_FORM_SELECTOR);

  // hide csv file upload form (i.e. container)
  csvFileUploadingContainer.css('display', 'none');

  // show loading container
  loadingTextElement.css('display', 'block');
  // set loadingDotsAnimated to true
  state.loadingDotsAnimated = true;

  // animate
  animateLoading()
}

/**********************
 * Event handlers
 ***********************/

function onSubmit() {
  $(SEND_CSV_BUTTON_SELECTOR).on(CLICK, function(event) {
    var csvInputField = $(CSV_INPUT_FIELD_SELECTOR);
    var csvInputFieldVal = csvInputField.val();
    var inputFieldNotEmpty= csvInputFieldVal !== '';
    var file;
    var fileName;

    if (inputFieldNotEmpty) {
      file = csvInputField[0].files[0];
      fileName = file.name;

      if (isCsvFile(fileName)) {
        showLoading();
        sendFile(file);
      }
    }
  });
}

function onTryAgain() {
  $(TRY_AGAIN_BUTTON_SELECTOR).on(CLICK, function(event) {
    var errorMessageContainer = $(ERROR_MESSAGE_CONTAINER_SELECTOR);
    var csvFileUploadingContainer = $(CSV_FILE_UPLOAD_FORM_SELECTOR);

    // hide error message container
    errorMessageContainer.css('display', 'none');

    // show csv file uploading continer
    csvFileUploadingContainer.css('display', 'block');
  });
}

/**********************
 * Register event handlers
 ***********************/

$(function() {
  onSubmit();
  onTryAgain();
})
