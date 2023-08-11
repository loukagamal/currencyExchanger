import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param url
   * @returns
   */
  get(url: string): Observable<any> {
    return this.http.get(url);
  }
  /**
   *
   * @param url
   * @param param
   * @returns
   */
  getWithParam(url: string, param?: any): Observable<any> {
    return this.http.get(url, { params: param });
  }
  /**
   * @param url  API Url for get Request
   * @param param
   * @param body object data for create Request
   * @returns
   */
  post(url: string, body: any, param?: any): Observable<any> {
    return this.http.post(url, body, { params: param });
  }

  /**
   * @param url API Url for get Request
   * @param body object data for create Request
   * @returns
   */
  update(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  /**
   * @param url API Url for get Request
   * @param body object data for create Request
   * @returns
   */
  patch(url: string, body: any): Observable<any> {
    return this.http.patch(url, body);
  }
  /**
   *
   * @param url
   * @returns
   */
  delete(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
