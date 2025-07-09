
import React, { useEffect, useState } from "react";
import styles from "./Weather.module.css";
import { FaSearch } from "react-icons/fa";

const API_KEY = "c9a0ca46550648b29ce125849232709";

export default function WeatherApp() {
  const [city, setCity] = useState("Hanoi");
  const [inputCity, setInputCity] = useState("Hanoi");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [localTime, setLocalTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      try {
        const currentRes = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
            city
          )}&aqi=no&lang=vi`
        );
        const currentData = await currentRes.json();

        if (currentData.error) {
          throw new Error(currentData.error.message);
        }

        setWeather(currentData);
        setLocalTime(currentData?.location?.localtime || "");

        const forecastRes = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
            city
          )}&days=1&aqi=no&alerts=no&lang=vi`
        );
        const forecastData = await forecastRes.json();

        const currentHour = new Date(currentData.location.localtime).getHours();
        const filteredHours = forecastData.forecast.forecastday[0].hour.filter(
          (h: any) => new Date(h.time).getHours() >= currentHour
        );

        setForecast(filteredHours);
        setError("");
      } catch (error: any) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
        setForecast([]);
        setError(error.message || "Không tìm thấy địa điểm");
      }
    }
    fetchWeather();
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.search}
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Nhập tên thành phố..."
          />
        </div>
      </form>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      {!weather ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.currentWeather}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <div>
                <div className={styles.temp}>{weather.current.temp_c}°</div>
                <div className={styles.conditionText}>
                  {weather.current.condition.text}
                </div>
              </div>
              <img
                src={weather.current.condition.icon}
                alt="icon"
                style={{ width: "90px", height: "90px", marginRight: "20px" }}
              />
            </div>

            <div className={styles.details}>
              <div className={styles.card}>
                <p>Humidity</p>
                <strong style={{ color: "black" }}>{weather.current.humidity}%</strong>
              </div>
              <div
                style={{
                  width: "1px",
                  backgroundColor: "#ccc",
                  margin: "0 1rem",
                }}
              ></div>{" "}
              {/* Đường kẻ dọc */}
              <div className={styles.card}>
                <p>Wind</p>
                <strong style={{ color: "black" }}>{weather.current.wind_kph} km/h</strong>
              </div>
            </div>
          </div>

          <div className={styles.forecast}>
            <div className={styles.forecastTitle}>Dự báo theo giờ</div>
            <div className={styles.hourly}>
              {forecast.map((hour, index) => {
                const isNow =
                  new Date(hour.time).getHours() ===
                  new Date(localTime).getHours();
                return (
                  <div key={index} className={styles.hourCard}>
                    <img src={hour.condition.icon} alt="" />
                    <div>{hour.temp_c}°</div>
                    <small>{isNow ? "Now" : hour.time.slice(-5)}</small>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

