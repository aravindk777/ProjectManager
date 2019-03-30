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
                  // .pipe(tap(data => console.log('data is:' + data)))
                  ;
    console.log('result is: ' + JSON.stringify(result));
    return result;
  }

  // Get Active Users only
  GetActiveUsers(): Observable<User[]> {
    const usersApiForActive = usersUrl + '/active';
    return this.http.get<User[]>(usersApiForActive, {headers: HEADERS});
  }

  // Create a user
  AddUser(newUser: User): Observable<User> {
   return this.http.post<User>(usersUrl, newUser, {headers: HEADERS})
                  .pipe(
                    // tap(resp => console.log(JSON.stringify(resp))),
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

  // Remove User
  RemoveUser(userId: string): Observable<boolean> {
    const deleteUserUri = usersUrl + '/' + userId;
    return this.http.delete<boolean>(deleteUserUri, {headers: HEADERS})
    .pipe(
      tap(resp => console.log('Deleting user - responded ' + resp)),
      map(resp => resp)
    );
  }

  // Search
  SearchUser(keyword: string): Observable<User[]> {
    const searchUserUrl = usersUrl + '/Search?keyword=' + keyword;
    return this.http.get<User[]>(searchUserUrl, {headers: HEADERS});
  }
}
