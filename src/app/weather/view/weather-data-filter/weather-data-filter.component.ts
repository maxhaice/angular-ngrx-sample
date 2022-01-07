import { Component, EventEmitter, Output } from "@angular/core";
import { DateTypesEnum } from "../../../core-feature/application/enums/date-types.enum";

@Component({
  selector: 'weather-data-filter',
  templateUrl: 'weather-data-filter.component.html',
  styleUrls: [ 'weather-data-filter.component.scss' ]
})

export class WeatherDataFilterComponent{

  @Output()
  dataType = new EventEmitter<DateTypesEnum>();

  @Output()
  cityName = new EventEmitter<string>();

  public changeDataType($event: any){
    let dateType = $event.target.selectedIndex === 0 ? DateTypesEnum.HOURLY : DateTypesEnum.DAILY
    this.dataType.emit(dateType);
  }

  public addCity($event: any): void{
    this.cityName.emit($event.target.value);
    $event.target.value = '';
  }

}
