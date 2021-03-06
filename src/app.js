const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Harshil Patel",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide a address for query",
    });
  }
  forecast(req.query.address, (forecastObj, city) => {
    if (forecastObj === 1) {
      return res.send({
        error: "Can not connect to the server.",
      });
    } else if (forecastObj === 2) {
      console.log("tes");
      return res.send({
        error: "Can not find location",
      });
    }
    res.send({ forecastObj, city });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Harshil Patel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Harshil Patel",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harshil Patel",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Harshil Patel",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
