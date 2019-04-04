import { TestBed, inject } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { of } from 'rxjs';
import { Task } from 'src/Model/Tasks/task.model';

describe('TasksService', () => {
  let ParentTasks: ViewTasks[];
  let mockAllTasks: ViewTasks[];
  let mockNewTask: Task;
  let mockTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TasksService]
    });

    ParentTasks = [
      {TaskId: 1, TaskName: 'TestTask1', ParentTaskName: null, Priority: 5,
      StartDate: null, EndDate: null, TaskOwnerId: '1dfdf', IsParent: true, OwnerFullName: 'TestUser1',
      ParentTaskId: null, ProjectId: 1, ProjectName: 'TestProject1', IsActive: true},

      {TaskId: 2, TaskName: 'TestTask2', ParentTaskName: null, Priority: 15,
      StartDate: null, EndDate: null, TaskOwnerId: '323232', IsParent: true, OwnerFullName: 'TestUser2',
      ParentTaskId: null, ProjectId: 2, ProjectName: 'TestProject2', IsActive: true},

      {TaskId: 3, TaskName: 'TestTask3', ParentTaskName: null, Priority: 25,
      StartDate: null, EndDate: null, TaskOwnerId: '4545454', IsParent: true, OwnerFullName: 'TestUser3',
      ParentTaskId: null, ProjectId: 3, ProjectName: 'TestProject3', IsActive: true},

      {TaskId: 4, TaskName: 'TestTask4', ParentTaskName: null, Priority: 10,
      StartDate: null, EndDate: null, TaskOwnerId: '76756', IsParent: true, OwnerFullName: 'TestUser4',
      ParentTaskId: null, ProjectId: 4, ProjectName: 'TestProject4', IsActive: true},

      {TaskId: 5, TaskName: 'TestTask5', ParentTaskName: null, Priority: 20,
      StartDate: null, EndDate: null, TaskOwnerId: 'dfdsaf3', IsParent: true, OwnerFullName: 'TestUser5',
      ParentTaskId: null, ProjectId: 5, ProjectName: 'TestProject5', IsActive: true},
    ];

    const tasksList = [
      {TaskId: 6, TaskName: 'TestTask6', ParentTaskName: 'TestTask1', Priority: 5,
      StartDate: null, EndDate: null, TaskOwnerId: '1dfdf', IsParent: false, OwnerFullName: 'TestUser1',
      ParentTaskId: 1, ProjectId: 1, ProjectName: 'TestProject1', IsActive: true},

      {TaskId: 7, TaskName: 'TestTask7', ParentTaskName: 'TestTask2', Priority: 15,
      StartDate: null, EndDate: null, TaskOwnerId: '323232', IsParent: false, OwnerFullName: 'TestUser2',
      ParentTaskId: 2, ProjectId: 2, ProjectName: 'TestProject2', IsActive: true},

      {TaskId: 8, TaskName: 'TestTask8', ParentTaskName: 'TestTask3', Priority: 25,
      StartDate: null, EndDate: null, TaskOwnerId: '4545454', IsParent: false, OwnerFullName: 'TestUser3',
      ParentTaskId: 3, ProjectId: 3, ProjectName: 'TestProject3', IsActive: true},

      {TaskId: 9, TaskName: 'TestTask9', ParentTaskName: 'TestTask4', Priority: 10,
      StartDate: null, EndDate: null, TaskOwnerId: '76756', IsParent: false, OwnerFullName: 'TestUser4',
      ParentTaskId: 4, ProjectId: 4, ProjectName: 'TestProject4', IsActive: true},

      {TaskId: 10, TaskName: 'TestTask10', ParentTaskName: 'TestTask5', Priority: 20,
      StartDate: null, EndDate: null, TaskOwnerId: 'dfdsaf3', IsParent: false, OwnerFullName: 'TestUser5',
      ParentTaskId: 5, ProjectId: 5, ProjectName: 'TestProject5', IsActive: true}
    ];
    mockAllTasks = tasksList.concat(ParentTasks);

    mockNewTask = {TaskId: 11, TaskName: 'NewTestTask', ProjectId: 2, Priority: 20, ParentTaskId: null,
    TaskOwnerId: '8989889', StartDate: new Date(), EndDate: null };

    mockTaskService = jasmine.createSpyObj(['GetParents', 'GetAllTasks', 'AddNewTask', 'GetTask', 'UpdateTask', 'EndTask']);
  });

  it('should be created', inject([TasksService], (service: TasksService) => {
    expect(service).toBeTruthy();
  }));

  it('Should get Only Parents record', inject([TasksService], (svc: TasksService) => {
    mockTaskService.GetParents.and.returnValue(of(ParentTasks));
    const actual = svc.GetParents();
    expect(actual).toBeTruthy();
  }));

  it('Should get All tasks', inject([TasksService], (svc: TasksService) => {
    mockTaskService.GetAllTasks.and.returnValue(of(mockAllTasks));
    const actual = svc.GetAllTasks();
    expect(actual).toBeTruthy();
  }));

  it('Should add a new Task', inject([TasksService], (svc: TasksService) => {
    mockTaskService.AddNewTask.and.returnValue(of(mockNewTask));
    const actual = svc.AddNewTask(mockNewTask);
    expect(actual).toBeTruthy();
  }));

  it('Should get a Task by TaskId', inject([TasksService], (svc: TasksService) => {
    mockTaskService.GetTask.and.returnValue(of(mockAllTasks[0]));
    const actual = svc.GetTask(1);
    expect(actual).toBeTruthy();
  }));

  it('Should Update a Task', inject([TasksService], (svc: TasksService) => {
    // arrange
    const expectedResult = true;
    const taskToEdit = {TaskId: 6, TaskName: 'updatedTask6', ParentTaskName: 'TestTask1', Priority: 5,
    StartDate: null, EndDate: null, TaskOwnerId: '1dfdf', IsParent: false, OwnerFullName: 'TestUser1',
    ParentTaskId: 1, ProjectId: 1, ProjectName: 'TestProject1', IsActive: true};
    mockTaskService.UpdateTask.and.returnValue(of(expectedResult));

    // act
    const actual = svc.UpdateTask(6, taskToEdit);

    // Assert
    expect(actual).toBeTruthy();
  }));

  it('Should End a Task by TaskId', inject([TasksService], (svc: TasksService) => {
    mockTaskService.EndTask.and.returnValue(of(true));
    const actual = svc.EndTask(8);
    expect(actual).toBeTruthy();
  }));
});
