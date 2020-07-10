const request = require("request");
const baseurl = "https://api.weatherbit.io/v2.0/current?city=";
const suffixurl = "&key=2c2f91795d6841b1bddffc18ce9908a8";
forecast = (city, callback) => {
  const url = baseurl + city + suffixurl;
  request({ url: url, json: true }, (error, resp, body) => {
    if (error) {
      callback(1);
    } else if (resp.body) {
      callback(resp.body.data[0], city);
    } else {
      callback(2);
    }
  });
};
module.exports = forecast;
