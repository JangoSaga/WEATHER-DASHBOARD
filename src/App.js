import { useEffect, useState } from "react";

function App() {
  const [currentCity, setCity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const currentDate = new Date();
  const months = [
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
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  const API_KEY = "436648f809654f83c1ca0906c7dae907";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      } else {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [currentCity]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-center text-lg font-semibold text-gray-700 mb-2">
          {formattedDate}
        </h1>
        <div className="text-center mb-4">
          {weatherData && weatherData.main && weatherData.weather ? (
            <>
              <h2 className="text-2xl font-bold text-blue-500 mb-2">
                {currentCity}
              </h2>
              <img
                className="w-20 mx-auto"
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
                alt={weatherData.weather[0]?.description}
              />
              <p className="text-xl text-gray-700">{weatherData.main.temp}°C</p>
              <p className="text-sm text-gray-500">
                Feels like {weatherData.main.feels_like}°C
              </p>
              <p className="text-gray-600 capitalize">
                {weatherData.weather[0]?.description}
              </p>
              <p className="text-sm text-gray-500">
                Humidity: {weatherData.main.humidity}%
              </p>
            </>
          ) : (
            <p className="text-red-500">{error || "Loading..."}</p>
          )}
        </div>
        <form
          className="flex items-center justify-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeatherData();
          }}
        >
          <input
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            type="text"
            placeholder="Enter City Name"
            value={currentCity}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Get
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
