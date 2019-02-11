import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/services/health.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;
  constructor(private _healthApi: HealthService) { }

  ngOnInit() {
    this.title = 'Project Manager';

    this._healthApi.ServiceAvailable()
    .subscribe(result => {
      console.log('Service available? ' + result);
    },
    err => {
      alert('Error occured while calling the API. Check the console logs for details.');
      console.log(err);
    });
  }

}
