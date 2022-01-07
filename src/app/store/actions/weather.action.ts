import { createAction, props } from '@ngrx/store';
import {
  WeatherDayInterface,
  WeatherWeekInterface,
} from "../../core-feature/domain/models/weather/interfaces/weather.interface";

export const getWeathersDay = createAction(
  '[Weather] Get day weather',
  props<{ lon: string, lat: string, cityName: string }>());

export const getWeathersDaySuccess = createAction(
  '[Weather] Get movie success',
  (weather: Readonly<WeatherDayInterface>, cityName: string) => ({ weather, cityName })
);

export const getWeathersWeek = createAction(
  '[Weather] Get weather',
  props<{ lon: string, lat: string, cityName: string }>());

export const getWeathersWeekSuccess = createAction(
  '[Weather] Get week movie success',
  (weather: Readonly<WeatherWeekInterface>, cityName: string) => ({ weather, cityName })
);
