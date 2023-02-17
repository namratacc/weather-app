let weather = {
  apikey: "3f43717715a09f8b795a7c5d7993ef22",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&APPID=" +
        this.apikey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".weather__city").innerText = name;
    document.querySelector(".weather__icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".weather__description").innerText = description;
    document.querySelector(".weather__temp").innerText = temp + "°C";
    document.querySelector(".weather__wind").innerText =
      "Wind speed: " + speed + "km/h";
    document.querySelector(".weather__humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".card__search-bar").value);
  },
};
document
  .querySelector(".card__search-btn")
  .addEventListener("click", function () {
    weather.search();
  });

document
  .querySelector(".card__search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Sydney");
