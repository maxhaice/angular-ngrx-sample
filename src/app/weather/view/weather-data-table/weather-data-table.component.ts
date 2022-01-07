import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DateTypesEnum } from "../../../core-feature/application/enums/date-types.enum";
import { CityWeather } from "../../../store/reducers/weather.reducers";

@Component({
  selector:'weather-data-table',
  templateUrl:'weather-data-table.component.html',
  styleUrls: ['weather-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WeatherDataTableComponent{
  @Input()
  dataType = DateTypesEnum.HOURLY;

  dateTypes = DateTypesEnum;

  @Input()
  weatherData: CityWeather[] = [];
}
