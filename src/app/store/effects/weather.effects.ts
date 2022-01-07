import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  getWeathersDay,
  getWeathersDaySuccess,
  getWeathersWeek,
  getWeathersWeekSuccess
} from "../actions/weather.action";
import { switchMap, map, mergeMap, concatMap } from "rxjs";
import { WeatherService } from "../../core-feature/domain/service/weather.service";

@Injectable()
export class WeatherEffects{

  getWeatherDay = createEffect(() =>
    this.action$.pipe(
      ofType(getWeathersDay),
      mergeMap((action) => {
        return this.weatherService.getDayWeather(action.lon, action.lat,).pipe(
          map((result) => getWeathersDaySuccess(result, action.cityName)),
        )
        }
      )
    )
  );

  getWeatherWeek = createEffect(() =>
    this.action$.pipe(
      ofType(getWeathersWeek),
      mergeMap((action) => {
          return this.weatherService.getWeekWeather(action.lon, action.lat).pipe(
            map(result => getWeathersWeekSuccess(result, action.cityName))
          )
        }
      )
    )
  );

  constructor(private action$: Actions, private weatherService: WeatherService) {}
}
