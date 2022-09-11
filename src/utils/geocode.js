const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibmFyZXNoMTQwNyIsImEiOiJja3czODNhcWcxYjVhMzBybzV5OTV3eW90In0.dCdbi9xcP4-NhfMp90pHrg";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geolocation services", undefined);
    } else if (
      response.body.message === "Forbidden" ||
      !response.body.features ||
      response.body.features.length === 0
    ) {
      callback("Unable to search for the location", undefined);
    } else {
      const { place_name: location, center } = response.body.features[0];
      const { [0]: longitude, [1]: lattitude } = center;
      callback(undefined, {
        location,
        longitude,
        lattitude,
      });
    }
  });
};

module.exports = geocode;
