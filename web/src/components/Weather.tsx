import { useState, useEffect } from "react";
import config from "../config.ts";

interface WeatherData {
  temp: number;
  description: string;
}

function weatherCode(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  return "Thunderstorm";
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const { lat, lon } = config.location;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=auto`,
    )
      .then((res) => res.json())
      .then((data) =>
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          description: weatherCode(data.current.weathercode),
        }),
      );
  }, []);

  if (!weather) return <span>Loading weather...</span>;

  return (
    <span>
      {config.location.city} - {weather.temp}°C, {weather.description}
    </span>
  );
}
