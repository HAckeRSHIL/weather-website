const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const m1 = document.querySelector("#m1");
const m2 = document.querySelector("#m2");
const m3 = document.querySelector("#m3");
const m4 = document.querySelector("#m4");
const m5 = document.querySelector("#m5");
const m6 = document.querySelector("#m6");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = search.value;
  const path = "/weather?address=" + location;
  m1.textContent = "Loading.....";
  fetch(path).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        m1.textContent = "Error : " + data.error;
      } else {
        m1.textContent = "Forecast : " + data.forecastObj.weather.description;
        m2.textContent =
          "Location : " +
          data.forecastObj.city_name +
          " , " +
          data.forecastObj.country_code;
        m3.textContent = "Time-Zone : " + data.forecastObj.timezone;
        m4.textContent = "Wind direction : " + data.forecastObj.wind_cdir_full;
        m5.textContent = "Sunrise at :  " + data.forecastObj.sunrise;
        m6.textContent = "Sunset at : " + data.forecastObj.sunset;
      }
    });
  });
});
