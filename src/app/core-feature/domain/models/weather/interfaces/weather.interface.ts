import { DaysEnum } from "../../../../application/enums/days.enum";
import { WeatherItemInterface } from "./weather-item.interface"

interface WeatherInterface<T> {
  weatherItems: WeatherItemInterface<T>[];
}

export interface WeatherDayInterface extends WeatherInterface<number> {
  weatherItems: WeatherItemInterface<number>[];
}

export interface WeatherWeekInterface extends WeatherInterface<DaysEnum> {
  weatherItems: WeatherItemInterface<DaysEnum>[];
}

export interface CityGeoInterface {
  name: string,
  lat: string,
  lon: string,
}
