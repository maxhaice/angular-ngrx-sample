import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { CityWeather, WeatherState } from "../../../store/reducers/weather.reducers";
import { weatherSelector } from "../../../store/selectors/weather.selectors";
import { Subject, Subscription, takeUntil } from "rxjs";
import { getWeathersDay, getWeathersWeek } from "../../../store/actions/weather.action";
import { WeatherService } from "../../../core-feature/domain/service/weather.service";
import { DateTypesEnum } from "../../../core-feature/application/enums/date-types.enum";

@Component({
  selector: 'weather-data',
  templateUrl: 'weather-data.component.html',
  styleUrls: ['weather-data.component.scss']
})

export class WeatherDataComponent implements OnInit, OnDestroy{
  public dataType = DateTypesEnum.HOURLY;
  public cityName = '';

  weather$ = this.store.pipe(select(weatherSelector));
  weatherItems: CityWeather[] = [];
  done = new Subject();

  subscriptions: Subscription[] = [];

  constructor(private store: Store<WeatherState>,
              private weatherService: WeatherService) {
  }

  public updateDataType($event: DateTypesEnum): void{
    this.dataType = $event;

    this.weatherItems.forEach((item) => {
      if(item.dayWeather.weatherItems.length === 0) {
        this.updateWeatherByCity(DateTypesEnum.HOURLY, item.cityName)
      }
      if(item.weekWeather.weatherItems.length === 0) {
        this.updateWeatherByCity(DateTypesEnum.DAILY, item.cityName)
      }
    })
  }

  public updateCityName($event: string): void{
    this.cityName = $event;
    this.updateWeatherByCity(this.dataType);
  }

  ngOnInit(): void{
      this.weather$.pipe(takeUntil(this.done))
        .subscribe((data) => {
          this.weatherItems = [...data];
        })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  private updateWeatherByCity(type: DateTypesEnum, cityName?: string): void{
    cityName = cityName ? cityName : this.cityName;

    this.subscriptions.push(this.weatherService.getCityGeo(cityName).subscribe(geo => {
        if (type === 1) {
          this.store.dispatch(getWeathersWeek({lon: geo.lon, lat: geo.lat, cityName: (cityName as string)}));
        } else {
          this.store.dispatch(getWeathersDay({lon: geo.lon, lat: geo.lat, cityName: (cityName as string)}));
        }
    }, () => { alert('City not found'); }))
  }
}
