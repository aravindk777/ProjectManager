import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Projects } from 'src/Model/Projects/projects.model';
import { Observable } from 'rxjs';

const HEADERS = new HttpHeaders({'Content-type': 'application/json'});
const projectApiEndPoint = environment.ApiBaseUrl + '/Projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  // Add a new project
  Add(newProject: Projects): Observable<Projects> {
    return this.http.post<Projects>(projectApiEndPoint, newProject, {headers: HEADERS});
  }

  // Get All Projects
  GetAll(): Observable<Projects[]> {
    return this.http.get<Projects[]>(projectApiEndPoint, {headers: HEADERS});
  }

  // Update an existing Project
  Update(project: Projects): Observable<boolean> {
    const editProjUrl = projectApiEndPoint + '/' + project.ProjectId;
    return this.http.put<boolean>(editProjUrl, project, {headers: HEADERS});
  }
}
