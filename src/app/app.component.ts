import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    let weather = { name: 'Madrid', country: 'ES' };

    if (localStorage.weather) {
      weather = JSON.parse(localStorage.getItem('weather'));
    }

    this.weatherService
      .getCurrentWeather(weather.name, weather.country)
      .subscribe(data => {
        this.weatherService.currentWeather.next(data);
      });
  }
}
