import { createSelector } from '@ngrx/store';
import { CityWeather, WeatherState } from "../reducers/weather.reducers";

export const weatherSelector = createSelector(
  (state: WeatherState) => state.cityWeather,
  (weather: ReadonlyArray<CityWeather>) => weather
);
