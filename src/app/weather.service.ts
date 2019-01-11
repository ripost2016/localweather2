import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const APPID = 'd9f2abfbec3ad3c7c4817814069c587e';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  currentWeather = new BehaviorSubject({
    // city: {
    //   name: '--'
    // },
    // list: [
    //   {
    //     dt: Date.now(),
    //     weather: [{ description: '--' }]
    //   }
    // ]
  });

  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(search: string | number, country?: string) {
    let uriParams = '';
    if (typeof search === 'string') {
      uriParams = `q=${search}`;
    } else {
      uriParams = `zip=${search}`;
    }

    if (country) {
      uriParams = `${uriParams},${country}`;
    }

    return this.getCurrentWeatherHelper(uriParams);
  }

  private getCurrentWeatherHelper(uriParams: string) {
    return this.httpClient.get(
      `http://api.openweathermap.org/data/2.5/forecast?` +
        `${uriParams}&appId=${APPID}&units=metric`
    );
  }
}
