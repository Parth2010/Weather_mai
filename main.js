const app = {
  init: () => {
    //Task 1:
    //TODO: Add event Listener for app.fetchWeather and app.getLocation

    document
      .getElementById("btnGet")
      .addEventListener("click", app.fetchWeather);
    document
      .getElementById("btnCurrent")
      .addEventListener("click", app.getLocation);
  },
  fetchWeather: (ev) => {
    //use the values from latitude and longitude to fetch the weather
    //TODO: get lat value from id = latitude input
    let lat = document.getElementById("latitude").value;

    //TODO: get lon value from id = longitude input
    let lon = document.getElementById("longitude").value;
    //Add your Key for the API Call
    let key = "6ae7d5258552e5ecd03b971674162475";
    let lang = "en";
    let units = "metric";
    //Create URL from the API document to get weather Data
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);

        return response.json();

        // app.showWeather();
      })
      .then((responsen) => {
        //console.log(response);
        app.showWeather(responsen);
      })

      .catch((err) => {
        console.error(err);
      });
    //TODO:fetch the weather
    //TODO:call fetch.then.the.catch method of javascript
    //TODO:If !response.ok throw error and print in console.err
    //TODO:If everything is okay call

    // app.showWeather;
  },
  getLocation: (ev) => {
    //TODO:Add options for navigator.geolocation.getCurrentPosition method
    let opts = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    //TODO: call  navigator.geolocation.getCurrentPosition to get current location and use callback function app.ftw and app.wtf
  },
  ftw: (position) => {
    //console.log(`Latitude : ${crd.latitude}`);
    //console.log(`Longitude: ${crd.longitude}`);
    //got position

    document.getElementsById("latitude").value =
      position.coords.latitude.toFixed(2);
    document.getElementById("longitude").value =
      position.coords.longitude.toFixed(2);

    //TODO:set position.coords.latitude value to the input id='latitude' of HTML
    //TODO:set position.coords.longitude value to the input id='longitude'of HTML
  },
  wtf: (err) => {
    //geolocation failed
    console.error(err);
    //TODO:console.error the err value
  },
  showWeather: (resp) => {
    //Get the row from the HTML using querySelector
    let row = document.querySelector(".weather.row");
    //clear out the old weather and add the new
    row.innerHTML = resp.daily
      .map((day, len) => {
        if (len <= 2) {
          //return;
          let date = new Date(day.dt * 1000).toDateString();
          let sunRise = new Date(day.sunrise * 1000).toTimeString();
          let sunSet = new Date(day.sunset * 1000).toTimeString();
          return `<div class="col">
            <div class="card">
            <h5 class="card-title p-2">${date}</h5>
              <img
                src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@4x.png"
                class="card-img-top"
                alt="${day.weather[0].description}"
              />
              <div class="card-body">
                <h3 class="card-title">${day.weather[0].main}</h3>
                <p class="card-text">High ${day.temp.max}&deg;C Low ${
            day.temp.min
          }&deg;C</p>
                <p class="card-text">High Feels like ${
                  day.feels_like.day
                }&deg;C</p>
                <p class="card-text">Pressure ${day.pressure}mb</p>
                <p class="card-text">Humidity ${day.humidity}%</p>
                <p class="card-text">UV Index ${day.uvi}</p>
                <p class="card-text">Precipitation ${day.pop * 100}%</p>
                <p class="card-text">Dewpoint ${day.dew_point}</p>
                <p class="card-text">Wind ${day.wind_speed}m/s, ${
            day.wind_deg
          }&deg;</p>
                <p class="card-text">Sunrise ${sunRise}</p>
                <p class="card-text">Sunset ${sunSet}</p>
              </div>
            </div>
          </div>
        </div>`;
        }
      })
      .join("");
    //TODO: map resp.daily Array.
    //TODO: If resp.daily has more then 3 values print only first 3 values. else print all Values.
    //TODO:The Card should show image from day.weather[0].icon. url for image is src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
    //TODO:All other Data  of Card should look as per the README.md ScreenShort.
    //row.innerHTML = "TODO: Your resp.daily.map";
  },
};

app.init();
