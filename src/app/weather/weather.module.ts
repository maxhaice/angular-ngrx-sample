import { NgModule } from "@angular/core";
import { WeatherDataTableComponent } from "./view/weather-data-table/weather-data-table.component";
import { WeatherDataComponent } from "./route/weather-data/weather-data.component";
import { WeatherRoutingModule } from "./weather.routing-module";
import { WeatherDataFilterComponent } from "./view/weather-data-filter/weather-data-filter.component";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

@NgModule({
  declarations:[
    WeatherDataTableComponent,
    WeatherDataComponent,
    WeatherDataFilterComponent,
  ],
  imports: [
    WeatherRoutingModule,
    CommonModule,
  ],
  providers: [
    Store,
  ]
})

export class WeatherModule {}
