// TODO: CSV should be passed in by the user; after prototype, make this dynamic
// NOTE: The previous TODO item depends on what the UI is going to be; for now it will be CLI

const csvToJSON = require('csvtojson');
const config = require('./config');
const googleMapsClient = require('@google/maps').createClient({
  key: config.googleApiKey, // THIS SHOULD BE HIDDEN PROD!!
  Promise: Promise
});
const Json2CsvParser = require('json2csv').Parser;
const fs = require('fs');
const convert = require('convert-units');
const csvFile = './stsTripData.csv';

function getTrips(csvFile) {
  return new Promise((resolve, reject) => {
    csvToJSON()
      .fromFile(csvFile)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getPickupLatLng(trip) {
  const PICKUP_LATITUDE = 'pickup_latitude';
  const PICKUP_LONGITUDE = 'pickup_longitude';
  const pickupLatLngObject = trip[PICKUP_LATITUDE] + ',' + trip[PICKUP_LONGITUDE];

  return pickupLatLngObject;
}

function getDropoffLatLng(trip) {
  const DROPOFF_LATITUDE = 'dropoff_latitude';
  const DROPOFF_LONGITUDE = 'dropoff_longitude';
  const dropoffLatLngObject = trip[DROPOFF_LATITUDE] + ',' + trip[DROPOFF_LONGITUDE];

  return dropoffLatLngObject;
}

function generateTripPrices() {
  getTrips(csvFile)
    .then((trips) => {
      // arrays used for google maps api
      // request
      const origins = [];
      const destinations = [];

      // 1) Generate the origin and destination
      //    object (technically strings)
      for (let trip of trips) {
        let origin = getPickupLatLng(trip);
        let destination = getDropoffLatLng(trip);
        origins.push(origin);
        destinations.push(destination);
      }
      // 2a) Get the distance for each trip
      googleMapsClient.distanceMatrix({
        origins,
        destinations
      }).asPromise()
        .then((response) => {
          const elements = response.json.rows[0].elements;
          const distances = [];

          for (let i = 0; i < elements.length; i++) {
            // 2b) Convert meters to miles
            let element = elements[i];
            distances.push(convertMetersToMiles(element.distance.value));
          }

          return distances;
        })
        .then((distances) => {
          // 3) Get the prices for each trip
          const prices = [];

          for (let distance of distances) {
            let price = getPrice(distance);
            prices.push(price);
          }

          return prices;
        })
        .then((prices) => {
          // 4) Now write all of the prices to the spread sheet
          //    Note: for now I just log it to the console for simplicity
          getTrips(csvFile)
            .then((results) => {
              const fields = getCsvColumns(results[0]);
              // add new field
              fields.push('price');
              // edit results object
              //add prices to results
              const udpadtedCsv = addPricesToCsvData(results, prices);
              const json2csvParser = new Json2CsvParser({ fields, doubleQuote: '' });
              const csv = json2csvParser.parse(udpadtedCsv);
              fs.writeFile(csvFile, csv, function(error) {
                if (error) {
                  throw error;
                }
                console.log('Successully written to file');
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

generateTripPrices();

function getCsvColumns(csvData) {
  return Object.keys(csvData);
}

function addPricesToCsvData(csvDataSet, prices) {
  for (let i = 0; i < csvDataSet.length; i++) {
    let csvData = csvDataSet[i];
    csvData.price = prices[i];
  }
  return csvDataSet;
}

function convertMetersToMiles(meters) {
  // always round down to the nearest whole number
  // e.g. 1.23232 -> 1 || 9.2348973 -> 9
  return parseInt(convert(meters).from('m').to('mi'));
}


function getPrice(miles) {
  let price = '';

  if (miles < 6) {
    price = '15$';
  } else if (miles < 9) {
    price = '17$';
  } else {
    // this should be added to another function
    // so that the logic can be unit tested
    price = 17 + ((210 * (miles - 9)) / 100) + '$';
  }

  return price;
}
