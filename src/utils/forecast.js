const request = require("request");

const forecast = (lattitude, longitude, units, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9f46d38e05f6ae179551ade210ef563b&query=" +
    encodeURIComponent(lattitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=" +
    encodeURIComponent(units);

  request({ url: url, json: true }, (error, response) => {
    const {
      error: bodyError,
      current: curr,
      location: geography,
    } = response.body;
    const {
      lat,
      lon,
      name,
      region,
      country,
      localtime,
      timezone_id: timezone,
    } = geography;
    const {
      weather_icons,
      weather_descriptions: weatherDescription,
      temperature,
      wind_speed,
      humidity,
      pressure,
      precip,
      cloudcover,
      visibility,
      uv_index,
    } = curr;

    const weather_icon = weather_icons[0];
    if (error) callback("Unable to access forecast services", undefined);
    else if (bodyError)
      callback("Unable to search for the location", undefined);
    else {
      callback(undefined, {
        lat,
        lon,
        name,
        region,
        country,
        localtime,
        timezone,
        weather_icon,
        weatherDescription,
        temperature,
        wind_speed,
        humidity,
        pressure,
        precip,
        cloudcover,
        visibility,
        uv_index,
      });
    }
  });
};

module.exports = forecast;
