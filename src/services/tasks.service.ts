import { Injectable } from '@angular/core';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from 'src/Model/Tasks/task.model';

const HEADERS = new HttpHeaders({'Content-type': 'application/json'});
const taskApiUrl = environment.ApiBaseUrl + '/Tasks';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  constructor(private http: HttpClient) {
  }

  // Get Parent tasks from the api
  GetParents(): Observable<ViewTasks[]> {
    // const getParentsUrl = taskApiUrl + '/Parent';
    const result = this.http.get<ViewTasks[]>(taskApiUrl, {headers: HEADERS})
    .pipe(
      map(data => data.filter(t => t.IsParent)),
      // tap(data => console.log('Parent tasks count: ' + data.length))
    );
    return result;
  }

  // Get All tasks
  GetAllTasks(): Observable<ViewTasks[]> {
    return this.http.get<ViewTasks[]>(taskApiUrl, {headers: HEADERS});
  }

  // Add a new task
  AddNewTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(taskApiUrl, newTask, {headers: HEADERS})
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      map(task => {
        if (task !== null) {
          console.log('New Task created successfully!');
          return task;
        }
      }
    )
    );
  }

  // Get a task by Id
  GetTask(taskId: number) {
    return this.http.get<Task>(taskApiUrl + '/' + taskId, {headers: HEADERS})
    .pipe(
      tap(result => console.log('Task retrieved: ' + JSON.stringify(result))),
    );
  }

  // Update the task
  UpdateTask(taskId: number, editingTask: Task): Observable<boolean> {
    const putTaskUrl = taskApiUrl + '/' + taskId;
    console.log('Incoming task to update: ' + JSON.stringify(editingTask));
    return this.http.put<boolean>(putTaskUrl, editingTask, {headers: HEADERS});
  }

  // End a Task
  EndTask(taskId: number): Observable<Boolean> {
    return this.http.post<Boolean>(taskApiUrl + '/' + taskId + '/End', {headers: HEADERS})
    .pipe(tap(result => console.log('Status of the End Task: ' + result)));
  }
}
