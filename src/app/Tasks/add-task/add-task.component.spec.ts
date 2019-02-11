import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { TasksService } from 'src/services/tasks.service';
import { of } from 'rxjs';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { By } from '@angular/platform-browser';
import { Task } from 'src/Model/Tasks/task.model';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let mockTaskService;
  let mockActivatedRoute;
  let mockRouter;
  let mockParams;
  let testTaskInfo: Task;
  let mockedParentTasks: ViewTasks[];

  @Component({
    selector: 'app-add-task',
    template: '<div></div>'
  })

  class TestAddTaskComponent {
    newTask: Task;
    taskId: number;
    parents: ViewTasks[];
    pageTitle: string;
    saveStatus = 0;
  }

  beforeEach(async(() => {
    // mock the params value
    mockParams = jasmine.createSpyObj(['id']);

    // ViewTask data
    mockedParentTasks = [
      {TaskId: 1, TaskName: 'TestTask-1', ParentTask: '', StartDate: new Date(),
      EndDate: new Date(), Priority: 10, Status: '', PriorityText: '', Active: false},
      {TaskId: 3, TaskName: 'TestTask-3', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 5, TaskName: 'TestTask-5', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 7, TaskName: 'TestTask-7', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 9, TaskName: 'TestTask-9', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true}
    ];

    // mock Task Service and methods
    mockTaskService = jasmine.createSpyObj(TasksService.name, [
      {'GetTasksCount': of(2)},
      'GetTask',
      'GetParents',
      'UpdateTask',
      'AddNewTask'
    ]);

    // mock Activated Route
    mockActivatedRoute = {queryParams: of(mockParams)}; // {queryParams: {Params: () => 1}};

    // mock Router
    mockRouter = {navigate: jasmine.createSpy('navigate')};

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ AddTaskComponent, TestAddTaskComponent ],
      providers: [
        {provide: TasksService, useValue: mockTaskService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    testTaskInfo = {TaskId: 1, TaskName: 'TestTask-1', ParentTaskId: 10, StartDate: new Date(), EndDate: null, Priority: 10, Status: ''};
    mockTaskService.GetTask.and.returnValue(of(testTaskInfo));
    fixture.detectChanges();
  });

  it('should initialize and create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call GetTaskInfo method to get the Task details from Service GetTask() method', () => {
    // act
    const result = fixture.componentInstance.GetTaskInfo(1);

    // assert
    expect(result).toBeTruthy();
    expect(result.TaskName).toBe('TestTask-1');
  });

  it('should add a new task successfully', () => {
    // arrange
    component.newTask = {TaskName: 'New Task Mock test', Priority: 10, StartDate: new Date(),
    ParentTaskId: 2, TaskId: 0, EndDate: null, Status: null};
    component.taskId = 0;
    // mockTaskService.UpdateTask.and.returnValue(of(true));
    mockTaskService.AddNewTask.and.returnValue(of(true));
    fixture.detectChanges();

    // act
    component.AddTasks();

    // assert
    expect(component.saveStatus).toBe(1);
    expect(fixture.debugElement.queryAll(val => val.name === 'successMsg')).toBeTruthy();
  });

  it('should udpate an existing task successfully', () => {
    // arrange
    component.newTask = {TaskName: 'Updating Task Mock test', Priority: 10, StartDate: new Date(),
    ParentTaskId: 2, TaskId: 4, EndDate: null, Status: null};
    component.taskId = 4;
    mockTaskService.UpdateTask.and.returnValue(of(true));
    fixture.detectChanges();

    // act
    component.AddTasks();

    // assert
    expect(component.saveStatus).toBe(1);
    expect(fixture.debugElement.queryAll(val => val.name === 'successMsg')).toBeTruthy();
  });

  it('should get Parent tasks only', () => {
    // arrange
    mockTaskService.GetParents.and.returnValue(of(mockedParentTasks));
    component.taskId = 2;
    // act
    component.GetParentTasks(component.taskId);
    fixture.detectChanges();

    // assert
    expect(component.parents.length).toBe(mockedParentTasks.length);
  });
});
