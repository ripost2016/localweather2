import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {
  forecast: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.currentWeather.subscribe(data => {
      this.forecast = data['list'] ? data['list'].slice(1, 8) : [];
      console.log(this.forecast);
    });
  }

  linkIcon(element) {
    return `http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
  }
}
