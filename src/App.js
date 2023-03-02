import React, { useState } from "react";
import "./index.css";

// from secrets
import { apiKey } from "./secrets";

function App() {
  // set the query onchange event
  const [query, setQuery] = useState("");
  // sets the weather to empty object, get from response
  const [weather, setWeather] = useState({});

  // search event to fire if enter key is pressed
  const search = (event) => {
    if (event.key === "Enter") {
      // fetch our base query the weather by onchange event then setting weather as the result of the fetch.
      fetch(`${apiKey.base}weather?q=${query}&units=metric&APPID=${apiKey.key}`)
        .then((res) => res.json())
        .then((res) => {
          setQuery("");
          setWeather(res);
          console.log(res);
        });
    }
  };

  // helper function to return date in UI
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // from Date library
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    // string to return in ui
    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            // setting the query for fetch
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            // calling the callback function for fetch
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="location-box">
            <div className="location">Please enter a city</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
