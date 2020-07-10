const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const m1 = document.querySelector("#m1");
const m2 = document.querySelector("#m2");

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
        m1.textContent = "Forecast : " + data.forecast;
        m2.textContent = "Location : " + data.location;
      }
    });
  });
});
