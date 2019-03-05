import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/Model/Users/user.Model';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

const HEADERS = new HttpHeaders({'Content-type': 'application/json'});
const usersUrl = environment.ApiBaseUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Get All Users
  GetUsers(): Observable<User[]> {
    const result = this.http.get<User[]>(usersUrl, {headers: HEADERS})
                  .pipe(tap(data => console.log(data)));
    return result;
  }

  // Create a user
  AddUser(newUser: User): Observable<User> {
   return this.http.post<User>(usersUrl, newUser, {headers: HEADERS})
                  .pipe(
                    tap(resp => console.log(JSON.stringify(resp))),
                    map(resp => resp)
                  );
  }

  // Edit User
  UpdateUser(userToUpdate: User): Observable<boolean> {
    const putUri = usersUrl + '/' + userToUpdate.UserId;
  return this.http.put<boolean>(putUri, userToUpdate, {headers: HEADERS})
  .pipe(
    tap(resp => console.log('result of update: ' + resp)),
    map(resp => resp)
  );
  }
}
