import { Injectable } from '@angular/core';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from 'src/Model/Tasks/task.model';

const HEADERS = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  constructor(private http: HttpClient) {
  }

  // Get Parent tasks from the api
  GetParents(): Observable<ViewTasks[]> {
    const getParentsUrl = environment.ApiBaseUrl + '/Parent';
    const result = this.http.get<ViewTasks[]>(getParentsUrl, {headers: HEADERS});
    // console.log('parents: ' + JSON.stringify(result));
    return result;
  }

  // Get all Tasks for View tasks page
  GetAllTasks(pageIndex: number, pageSize: number, taskNameFilter: string = '', parentTaskFilter: string = '',
    priorityFrom = 0, priorityTo = 0, startFilter: Date = null, endFilter: Date = null): Observable<ViewTasks[]> {
    // console.log('Get all tasks with pagination values: ' + pageSize);
    let getTasksURL = environment.ApiBaseUrl + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
    const filterUrl = 'filters.taskName=' + taskNameFilter + '&filters.parentTask=' + parentTaskFilter +
    '&filters.priorityFrom=' + priorityFrom + '&filters.priorityTo=' + priorityTo +
    '&filters.startDate=' + startFilter + '&filters.endDate=' + endFilter;
    console.log('Filters query: ' + filterUrl);
    getTasksURL = getTasksURL + '&' + filterUrl;
    console.log('Url to call: ' + getTasksURL);
    return this.http.get<ViewTasks[]>(getTasksURL, {headers: HEADERS})
    .pipe(
      tap(data => console.log('Total tasks available to show: ' + JSON.stringify(data.length))),
    );
  }

  // Add a new task
  AddNewTask(newTask: Task): Observable<boolean> {
    console.log('Inside AddNewTask method with incoming value:' + JSON.stringify(newTask));
    // let status = false;
    return this.http.post<Task>(environment.ApiBaseUrl, newTask, {headers: HEADERS})
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      map(task => {
        if (task !== null) {
          // console.log('status is good');
          return true;
        } else {
          // console.log('Post from service is failed.');
          return false;
        }
      }
    )
    );
  }

  // Get a task by Id
  GetTask(taskId: number) {
    return this.http.get<Task>(environment.ApiBaseUrl + '/' + taskId, {headers: HEADERS})
    .pipe(
      tap(result => console.log('Task retrieved: ' + JSON.stringify(result))),
    );
  }

  // Update the task
  UpdateTask(taskId: number, editingTask: Task): Observable<boolean> {
    const putTaskUrl = environment.ApiBaseUrl + '/' + taskId;
    console.log('Incoming task to update: ' + JSON.stringify(editingTask));
    return this.http.put<boolean>(putTaskUrl, editingTask, {headers: HEADERS})
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      map(data => data)
      );
  }

  // Get Total count
  GetTasksCount(): Observable<number> {
    console.log(environment.ApiBaseUrl + '/Total');
    return this.http.get<number>(environment.ApiBaseUrl + '/Total', {headers: HEADERS}) // ;
    .pipe(tap(result => console.log('result of Getcount: ' + result)));
  }

  // End a Task
  EndTask(taskId: number): Observable<Boolean> {
    return this.http.post<Boolean>(environment.ApiBaseUrl + '/' + taskId, {headers: HEADERS})
    .pipe(tap(result => console.log('Status of the End Task: ' + result)));
  }
}
