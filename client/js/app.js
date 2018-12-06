/**********************
 * Variables
 ***********************/

// Selectors
var SEND_CSV_BUTTON_SELECTOR = '#send-csv-button';
var CSV_INPUT_FIELD_SELECTOR = '#csv-input-field';
var CSV_FILE_UPLOAD_FORM_SELECTOR = '.csv-file-upload-form';
var LOADING_SELECTOR = '.loading';
var LOADING_DOT_SELECTOR = '.loading-dot';

// Events
var CLICK = 'click';

/**********************
 * Utils
 ***********************/

function isCsvFile(fileName) {
  var parsedName = fileName.split('.');

  return parsedName[1] === 'csv';
}

function sendFile(file) {
  var formData = new FormData();

  formData.append('csv-file-upload', file, file.name);
  // formData.append('upload_file', true);

  $.ajax({
      type: 'POST',
      url: '/csvUploads',
      success: function (fileUrl) {
          var loadingTextElement = $(LOADING_SELECTOR);
          var csvFileUploadingContainer = $(CSV_FILE_UPLOAD_FORM_SELECTOR);

          // download updated file
          window.open(fileUrl);

          // stop the animations
          state.loadingDotsAnimated = false;

          // hide csv file upload form (i.e. container)
          csvFileUploadingContainer.css('display', 'block');

          // show loading container
          loadingTextElement.css('display', 'none');
      },
      error: function (error) {
          console.log(error);
      },
      async: true,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      timeout: 120000
    });
}

function generateEqString(selector, index) {
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

function animateLoadingDot(dotIndex) {
  var loadingDots = $(LOADING_DOT_SELECTOR);
  var index = dotIndex !== undefined ? dotIndex : 0;
  var dotSelector;
  var dot;

  if (state.loadingDotsAnimated) {
    dotSelector = generateEqString(LOADING_DOT_SELECTOR, index);
    dot = $(dotSelector);
    dot.hide(1000, function() {
      var newIndex;

      // Check if last loading dot
      if (index + 1 === loadingDots.length) {
        newIndex = 0;
      } else {
        newIndex = index + 1;
      }

      // show hidden dot
      dot.show();

      // recursively call new function
      animateLoadingDot(newIndex);
    });
  }
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
  animateLoadingDot()
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

/**********************
 * Register event handlers
 ***********************/

$(function() {
  onSubmit();
})
