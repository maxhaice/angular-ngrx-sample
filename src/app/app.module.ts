import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app.routing-module";
import { EffectsModule } from "@ngrx/effects";
import { WeatherEffects } from "./store/effects/weather.effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { HttpClientModule } from "@angular/common/http";
import { CoreFeatureModule } from "./core-feature/core-feature.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([WeatherEffects]),
    CoreFeatureModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
