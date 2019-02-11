import { TestBed, inject } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { of, Observable } from 'rxjs';

describe('TasksService', () => {
  let ParentTasks: ViewTasks[];
  let mockTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TasksService]
    });
    ParentTasks = [
      {TaskId: 1, TaskName: 'Parent 1', ParentTask: null, Priority: 5, PriorityText: '',
      StartDate: null, EndDate: null, Status: '', Active: true },
      {TaskId: 2, TaskName: 'Parent 2', ParentTask: null, Priority: 2, PriorityText: '',
      StartDate: null, EndDate: null, Status: '', Active: true },
      {TaskId: 3, TaskName: 'Parent 3', ParentTask: null, Priority: 5, PriorityText: '',
      StartDate: null, EndDate: null, Status: '', Active: true },
      {TaskId: 4, TaskName: 'Parent 4', ParentTask: null, Priority: 7, PriorityText: '',
      StartDate: null, EndDate: null, Status: '', Active: true },
    ];

    mockTaskService = jasmine.createSpyObj(['GetParents']);
  });

  it('should be created', inject([TasksService], (service: TasksService) => {
    expect(service).toBeTruthy();
  }));

  it('Should get Only Parents record', inject([TasksService], (svc: TasksService) => {
    const data = mockTaskService.GetParents.and.returnValue(of(this.ParentTasks));

    const actual = svc.GetParents();

    expect(actual).toBeTruthy();
  }));
});
