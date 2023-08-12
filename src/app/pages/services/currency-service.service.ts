import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/service/http.service';
import { environment } from 'src/environments/environment';
import { config } from '../config';

@Injectable({
  providedIn: 'root',
})
export class CurrencyServiceService {

  constructor(private _http: HttpService) {}

  getConvert(to: string, from: string, amount: number) {
    const url = `${config.API.convert}?to=${to}&from=${from}&amount=${amount}`;
    return this._http.get(url);
  }
  getSymbols() {
    const url = `${config.API.symbols}`;
    return this._http.get(url);
  }
  convertObjToArray(obj: any) {
    let result = Object.keys(obj).map((key) => {
      let x = { name: key, details: obj[key] };
      return x;
    });
    return result;
  }
  convertObjToString(obj: any) {
    let result = Object.keys(obj).map((key) => {
      let x = obj[key];
      return x;
    });
    return result[0];
  }

  getLatest(symbols: string, base: string) {
    const url = `latest?symbols= ${symbols}&base=${base}`;
    return this._http.get(url);
  }
  getRates(date: string, symbols: string, base: string) {
    const url = `${date}?symbols= ${symbols}&base=${base}`;
    return this._http.get(url);
  }

}
