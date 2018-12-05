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

function isCsvFile(file) {
  var name = file.split('\\').pop();
  var parsedName = name.split('.');

  return parsedName[1] === 'csv';
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

    if (inputFieldNotEmpty && isCsvFile(csvInputFieldVal)) {
      showLoading();
      // send form data
        // within form data cb
          // stop animations
            // set do the oppisite of
            // what is done within show loading
    }
  });
}

/**********************
 * Register event handlers
 ***********************/

$(function() {
  onSubmit();
})
