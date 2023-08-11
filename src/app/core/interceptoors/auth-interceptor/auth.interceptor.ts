import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class authInterCeptor implements HttpInterceptor {
  baseURL = environment.apiUrl;
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let url = this.baseURL + request.url;
    request = request.clone({
      url: url,
      setHeaders: {
        apikey: `H0I3bODSbj3j5eEDYRg4Q4oEP1MeGkXg888`,
      },
    });

    return next.handle(request);
  }
}
