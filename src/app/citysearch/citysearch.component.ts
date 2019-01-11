import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-citysearch',
  templateUrl: './citysearch.component.html',
  styleUrls: ['./citysearch.component.css']
})
export class CitysearchComponent implements OnInit {
  search = new FormControl('', [Validators.minLength(2)]);

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        if (!this.search.invalid) {
          const userInput = searchValue.split(',').map(s => s.trim());

          this.weatherService
            .getCurrentWeather(
              userInput[0],
              userInput.length > 1 ? userInput[1] : undefined
            )
            .subscribe(data => {
              console.log(data);
              this.weatherService.currentWeather.next(data);
            });
        }
      });
  }

  getErrorMessage() {
    return this.search.hasError('minlength')
      ? 'Type more than one character to search'
      : '';
  }
}
