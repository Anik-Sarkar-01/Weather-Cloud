# Weather-Cloud-Website

## Deployment Link: https://weather-cloud-in.herokuapp.com/

## About

-   This is a simple website to get **geographic and forecast details** of a place.
-   The website provides support for **metric, scientific and Fahrenheit scales** of measurement.
-   The data is fetched using **weatherstack** and **geolocation** API.

## Project Description

-   User enters the name of the location in the input field.
-   The request is sent to the /weather route using fetch API.
-   The /weather route forwards the request recieved to the geolocation API.
-   The geolocation API accepts the input address and transforms into location coordinates.
-   The coordinates are then processed by the weatherstack API to return the data.

## Technologies used:

-   HTML
-   CSS
-   Javascript
-   Node.js
-   Express.js
-   Handlebars(HBS) templating engine

## Routes

-   **/:** Displays the weather response.
-   **/weather:** Makes API request to fetch data from weatherstack and geolocation APIS.
-   **/about:** Displays my about information.
-   **/help:** Displays some troubleshooting steps and possible points of failure.
-   **/\*:** Displays 404 error in case an invalid route is accessed.
