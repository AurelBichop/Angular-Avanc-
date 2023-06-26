import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKey } from './api.key';

export class MoviesKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const params = 'language=fr-FR';

    const requestWithParams = req.clone({
      headers: req.headers.append('Authorization', apiKey),
      url: req.url + (req.url.includes('language=fr-FR') ? `` : `?${params}`),
    });

    //console.log(requestWithParams); //
    return next.handle(requestWithParams);
  }
}
