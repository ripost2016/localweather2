import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: any;
  formatTemp: any;

  constructor(private weatherService: WeatherService) {
    this.formatTemp = weatherService.formatTemp();
  }

  ngOnInit() {
    this.weatherService.currentWeather.subscribe(data => {
      this.current = data;
      if (this.current.city) {
        console.log(
          new Date(this.calcTimeFromLong(this.current.city.coord.lon))
        );
      }
    });
  }

  linkIcon() {
    return `http://openweathermap.org/img/w/${
      this.current.list[0].weather[0].icon
    }.png`;
  }

  calcTimeFromLong(long: number) {
    const localTime = new Date();
    const currOffset = localTime.getTimezoneOffset() * 60000; // 1 min * 60 segundos * 1000 ms
    const utc = localTime.getTime() + currOffset;

    const destOffset = Math.round((long * 24) / 360) * 3600000; // 1 hora * 60 min * 60 s * 1000 ms
    const destUtc = utc + destOffset;

    return destUtc;
  }

  parseHpaToMmhg(pressure: number) {
    return Math.round(pressure * 0.75006157584566);
  }

  parseWind(deg: number) {
    if (deg >= 348.76 && deg <= 11.25) {
      return 'N';
    }
    if (deg >= 11.26 && deg <= 33.75) {
      return 'NNE';
    }
    if (deg >= 33.76 && deg <= 56.25) {
      return 'NE';
    }
    if (deg >= 56.26 && deg <= 78.75) {
      return 'ENE';
    }
    if (deg >= 78.76 && deg <= 101.25) {
      return 'E';
    }
    if (deg >= 101.26 && deg <= 123.75) {
      return 'ESE';
    }
    if (deg >= 123.76 && deg <= 146.25) {
      return 'SE';
    }
    if (deg >= 146.26 && deg <= 168.75) {
      return 'SSE';
    }
    if (deg >= 168.76 && deg <= 191.25) {
      return 'S';
    }
    if (deg >= 191.26 && deg <= 213.75) {
      return 'SSW';
    }
    if (deg >= 213.76 && deg <= 236.25) {
      return 'SW';
    }
    if (deg >= 236.26 && deg <= 258.75) {
      return 'WSW';
    }
    if (deg >= 258.76 && deg <= 281.25) {
      return 'W';
    }
    if (deg >= 281.26 && deg <= 303.75) {
      return 'WNW';
    }
    if (deg >= 303.76 && deg <= 326.25) {
      return 'NW';
    }
    if (deg >= 326.26 && deg <= 348.75) {
      return 'NNW';
    }
  }
}
