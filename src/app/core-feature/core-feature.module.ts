import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { coreInterceptorsProvider } from "./application/interceptors";
import { WeatherService } from "./domain/service/weather.service";
import { WeatherSerializer } from "./application/serializer/weather/weather.serializer";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    // application
    WeatherSerializer,

    // domain
    WeatherService,

    // interceptors
    coreInterceptorsProvider,
  ],
})
export class CoreFeatureModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreFeatureModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
