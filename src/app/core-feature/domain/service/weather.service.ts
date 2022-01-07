import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../../../environments/environment";
import { CityGeoInterface, WeatherDayInterface, WeatherWeekInterface } from "../models/weather/interfaces/weather.interface";
import { WEATHER } from "../../../constants/weather.constants";
import { createWeatherApiUrl } from "../../../helper/url-configurator";
import { CityGeoDTO, DayWeatherDTO, WeekWeatherDTO } from "../../application/dto/weather.dto";
import {
  WeatherSerializer
} from "../../application/serializer/weather/weather.serializer";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private readonly weatherGeoUrl: string;
  private readonly weatherDayUrl: string;
  private readonly weatherWeekUrl: string;
  private WeatherSerializer: WeatherSerializer = new WeatherSerializer();
  constructor(private http: HttpClient) {
    this.weatherGeoUrl = createWeatherApiUrl(environment.API_WEATHER_GEO_URL, WEATHER.weatherGeoUrlPayload)
    this.weatherDayUrl = createWeatherApiUrl(environment.API_WEATHER_DATA_URL, WEATHER.weatherDayDataUrlPayload)
    this.weatherWeekUrl = createWeatherApiUrl(environment.API_WEATHER_DATA_URL, WEATHER.weatherWeekDataUrlPayload)
  }

  getWeekWeather(lon: string, lat: string): Observable<Readonly<WeatherWeekInterface>> {
    return this.http.get<Readonly<WeekWeatherDTO>>(this.weatherWeekUrl + `&lon=${lon}&lat=${lat}`)
      .pipe(
        map((data) => {
          return this.WeatherSerializer.serialize(data);
        }),
        catchError((error: HttpErrorResponse) => {
          throw (error);
        })
    );
  }

  getDayWeather(lon: string, lat: string): Observable<Readonly<WeatherDayInterface>> {
    return this.http.get<Readonly<DayWeatherDTO>>(this.weatherDayUrl + `&lon=${lon}&lat=${lat}`)
      .pipe(
        map((data) => {
          return this.WeatherSerializer.serialize(data)
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          throw (error);
        })
    )
  }

  getCityGeo(cityName: string): Observable<Readonly<CityGeoInterface>> {
    return this.http.get<ReadonlyArray<CityGeoDTO>>(this.weatherGeoUrl + `&q=${cityName}`)
      .pipe(
        map((item) => ({name: cityName, lat: item[0].lat, lon: item[0].lon })),
      );
  }
}
