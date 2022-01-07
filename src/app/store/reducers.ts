import {
  ActionReducerMap,
} from '@ngrx/store';
import {
  weatherReducer,
  WeatherState,
} from './reducers/weather.reducers';

export const reducers: ActionReducerMap<WeatherState> = {
  cityWeather: weatherReducer
};
