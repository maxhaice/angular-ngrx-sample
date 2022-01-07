import {
  createReducer,
  on,
} from '@ngrx/store';
import {
  getWeathersDaySuccess,
  getWeathersWeekSuccess
} from '../actions/weather.action';
import {
  WeatherDayInterface,
  WeatherWeekInterface,
} from "../../core-feature/domain/models/weather/interfaces/weather.interface";

export type CityWeather = {
  cityName: string,
  weekWeather: Readonly<WeatherWeekInterface>,
  dayWeather:Readonly<WeatherDayInterface>,
};

export interface WeatherState {
  cityWeather: CityWeather[],
}

const initialWeatherState: CityWeather[] = [];

export const weatherReducer = createReducer(
  initialWeatherState,
  on(getWeathersDaySuccess, (state, { weather, cityName }) => {
    let previousState = state.find((item) => item.cityName === cityName);
    let result;

    if(previousState) {
      result = state.filter((item) => item.cityName !== cityName);
      result = [...result, {cityName, dayWeather: filterDayWeather(weather), weekWeather: previousState.weekWeather}]
    }
    else{
      result = [...state, {cityName, dayWeather: filterDayWeather(weather), weekWeather: { weatherItems: [] }}]
    }
    return result
  }),
  on(getWeathersWeekSuccess, (state, { weather, cityName }) =>
  {
    let previousState = state.find((item) => {
      return item.cityName === cityName;
    });
    let result;

    if(previousState) {
      result = state.filter((item) => item.cityName !== cityName);
      result = [...result, {cityName, dayWeather: previousState.dayWeather, weekWeather: filterWeekWeather(weather)}]
    }
    else{
      result = [...state, {cityName, dayWeather: { weatherItems: [] }, weekWeather: filterWeekWeather(weather)}]
    }
    return result
  }),
);

const filterDayWeather = (weather: WeatherDayInterface):WeatherDayInterface => {
  return {
    weatherItems: weather.weatherItems.filter(
      (item, index) => index % 6 === 0
    ).map((item) => ({
      weatherItemProperties:{
        temperature: +(item.weatherItemProperties.temperature - 273.15).toFixed(2)
      },
      point: item.point
    }))
  }
}

const filterWeekWeather = (weather: WeatherDayInterface):WeatherDayInterface => {
  return {
    weatherItems: weather.weatherItems.map((item) => ({
      weatherItemProperties:{
        temperature: +(item.weatherItemProperties.temperature - 273.15).toFixed(2)
      },
      point: item.point
    }))
  }
}
