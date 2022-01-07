import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";

@Injectable()
export class WeatherTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/api.openweathermap.org/') == 0) {
      return next.handle(req);
    }

    const clonedReq = req.clone({
      params: req.params.set('appid', environment.API_KEY)
    });

    return next.handle(clonedReq);
  }
}
