import React, { useState } from "react";
import axios from "axios";
import { TiWeatherCloudy, TiWeatherWindyCloudy } from "react-icons/ti";
import { BiSearchAlt, BiWind } from "react-icons/bi";
import "./Weather.css";
import { WiHumidity } from "react-icons/wi";
const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3176c54b850aabcc95de2e483283a322`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  return (
    <div className="weather">
      <div className="weatherContainer">
        <div className="weatherSearch">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={searchLocation}>
            <BiSearchAlt />
          </button>
        </div>
        {typeof data.main === "undefined" ? (
          <h1 className="title">Welcome to Weather.Co! Enter your location</h1>
        ) : (
          <div className="weather__card">
            <div className="content">
              <h2>
                {data.name}, {data.sys ? <span>{data.sys.country}</span> : null}
              </h2>

              {data.main ? (
                <h1>{(data.main.temp - 271).toFixed(1)}°C</h1>
              ) : null}
              <TiWeatherCloudy className="content__icons" />
            </div>
            <div className="secondaryContent">
              <div>
                <TiWeatherWindyCloudy className="secondaryContent__icons" />
                <p>feels like</p>
                <h3> {data.main ? data.main.feels_like : null}</h3>
              </div>
              <div>
                <WiHumidity className="secondaryContent__icons" />
                <p>humidity</p>
                <h3>{data.main ? data.main.humidity : null}</h3>
              </div>
              <div>
                <BiWind className="secondaryContent__icons" />
                <p>wind speed</p>
                <h3>{data.wind ? data.wind.speed : null}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
