//Form variables
const form = document.querySelector("form");
const input = document.querySelector("input");
const unitChoice = document.querySelector("#unit-choice");
const search = document.querySelector("button");

//Info variables
const weatherImage = document.querySelector("#weather-image");
const loc = document.querySelector("#location");
const coordTime = document.querySelector("#coord-time");
const physicalParameters = document.querySelector("#physical-parameters");
const vintageParameters = document.querySelector("#vintage-parameters");
const infoItems = document.querySelectorAll(".info-item");
const infoBox = document.querySelector("#info-box");
const spans = document.querySelectorAll("span");

form.addEventListener("submit", (e) => {
  //Prevent the default page refresh on form submit
  e.preventDefault();

  //Query string parameters
  const query = input.value;
  const unitVal = unitChoice.value;

  //Unit variables
  let tempUnit = "&#186;C";
  let windSpeedUnit = "Kilometers per hour";
  let visibilityUnit = "Kilometers";
  let precipUnit = "millimeters";

  //Modifying the units printed
  if (unitVal === "s") {
    tempUnit = "Kelvin";
  } else if (unitVal === "f") {
    tempUnit = "&#186;F";
    windSpeedUnit = "miles per hour";
    visibilityUnit = "miles";
    precipUnit = "inches";
  }

  //Making a fetch request to the weatherstack and geolocation api using weather route
  const url = `/weather?address=${query}&units=${unitVal}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        infoBox.innerHTML = `
        <div class = "info-item" id="weather-image">
          <span>
            ${data.error}
          </span>
        </div>`;
      } else {
        const fdata = data.forecast;

        let output = "";

        output += `
        <div class = "info-item" id="weather-image">
          <span>
            <img src="${fdata.weather_icon}" alt="image not found" />
            The forecast is ${fdata.weatherDescription}, with current temperature at ${fdata.temperature} ${tempUnit}.
            The wind is blowing at ${fdata.wind_speed} ${windSpeedUnit}.
          </span>
        </div>`;

        output += `
        <div class = "info-item" id="location">
          <span> <b>Location </b> ${fdata.name}</span> 
          <span><b>Region </b>${fdata.region}</span> 
          <span><b>Country </b>${fdata.country}</span>
        </div>`;

        output += `
        <div class = "info-item" id="coord-time">
          <span> <b>Coordinates </b> ${fdata.lat}&#186; ${fdata.lon}&#186;</span> 
          <span><b>Time</b> ${fdata.localtime}</span> 
          <span><b>Time Zone </b>${fdata.timezone}</span>
        </div>`;

        output += `
        <div class = "info-item" id="physical-parameters">
          <span><b>Humidity </b>${fdata.humidity}%</span> 
          <span><b>Pressure </b>${fdata.pressure} millibar</span> 
          <span><b>Precipitation </b>${fdata.precip} ${precipUnit}</span>
        </div>`;

        output += `
        <div class = "info-item" id="vintage-parameters">
          <span><b>Cloud Cover </b>${fdata.cloudcover} oktas</span>
          <span><b>Visibility </b>${fdata.visibility} ${visibilityUnit}</span> 
          <span><b>UV Index </b>${fdata.uv_index} </span>
        </div>`;

        infoBox.innerHTML = output;
      }
    });
  });
});
