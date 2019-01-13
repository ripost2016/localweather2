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
    });
  }

  linkIcon() {
    return `http://openweathermap.org/img/w/${
      this.current.list[0].weather[0].icon
    }.png`;
  }
}
