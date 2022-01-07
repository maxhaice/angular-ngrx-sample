type WeatherByHour = { temp: number };

type WeatherByDay = {
  temp: {"day": number}
}

export interface DayWeatherDTO {
  hourly: WeatherByHour[],
}

export interface WeekWeatherDTO {
  daily: WeatherByDay[],
}

export interface CityGeoDTO {

  lat: string,
  lon: string,
}
