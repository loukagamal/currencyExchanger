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
        apikey: `vWAyNU09LDzQ3vEYQbfIWH8Pm5Pqfdm6`,
      },
    });

    return next.handle(request);
  }
}
