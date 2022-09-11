//Required variable
const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const port = process.env.PORT ;

//Static resources and view resources path
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Registering partials path
hbs.registerPartials(partialsPath);
//setting up the view engine, view path
app.set("view engine", "hbs");
app.set("views", viewsPath);

//setting up the static resources path to serve
app.use(express.static(staticPath));

// Routes

// Index page route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Cloud",
    name: "Anik Sarkar | All rights reserved.",
  });
});

// About page route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Anik Sarkar | All rights reserved.",
  });
});

// Help page route
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Coming up soon...",
    name: "Anik Sarkar | All rights reserved.",
  });
});

// Weather route to be invoked on the index page route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address field can't be empty",
    });
  }
  if (!req.query.units) {
    return res.send({
      error: "System of measurement has to be choosen",
    });
  }

  geocode(
    req.query.address,
    (error, { location, longitude, lattitude } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(
        lattitude,
        longitude,
        req.query.units,
        (forecastError, forecast) => {
          if (forecastError) {
            return res.send({
              forecastError,
            });
          }
          res.send({
            forecast,
          });
        }
      );
    }
  );
});

//Bad request/Error route
app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
    title: "404",
    name: "Anik Sarkar | All rights reserved.",
  });
});

//Server listening on the port 3000
app.listen(port, () => {
  console.log(`The server is up on port ${port}`);
});
