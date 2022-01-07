import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherTokenInterceptor } from "./weather-token.interceptor";

export const coreInterceptorsProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: WeatherTokenInterceptor, multi: true },
];
