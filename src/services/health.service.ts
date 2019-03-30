import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

const HEADERS = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private http: HttpClient) { }

  // Get Service Health status
  ServiceAvailable(): Observable<boolean> {
    console.log(environment.ApiBaseUrl + '/health/service');
    return this.http.get<boolean>(environment.ApiBaseUrl + '/health/service', {headers: HEADERS}) // ;
    .pipe(tap(result => console.log('service available? ' + result)));
  }
}
