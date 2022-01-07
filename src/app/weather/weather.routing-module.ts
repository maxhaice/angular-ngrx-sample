import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDataComponent } from "./route/weather-data/weather-data.component";

const routes: Routes = [
  { path: '', component: WeatherDataComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
