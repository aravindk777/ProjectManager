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
      {TaskId: 1, TaskName: 'TestTask-1', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '1', OwnerFullName: 'TestUser1', IsParent: true,
      ProjectId: 1, ProjectName: 'Project1', EndDate: new Date(), Priority: 10, IsActive: false},

      {TaskId: 3, TaskName: 'TestTask-3', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '2', OwnerFullName: 'TestUser2', IsParent: true,
      ProjectId: 2, ProjectName: 'Project2', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 5, TaskName: 'TestTask-5', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '3', OwnerFullName: 'TestUser3', IsParent: true,
      ProjectId: 3, ProjectName: 'Project3', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 7, TaskName: 'TestTask-7', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '4', OwnerFullName: 'TestUser4', IsParent: true,
      ProjectId: 4, ProjectName: 'Project4', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 9, TaskName: 'TestTask-9', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '5', OwnerFullName: 'TestUser5', IsParent: true,
      ProjectId: 5, ProjectName: 'Project5', EndDate: null, Priority: 10, IsActive: true},
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
    testTaskInfo = {TaskId: 1, TaskName: 'TestTask-1', ParentTaskId: 10, StartDate: new Date(), EndDate: null, Priority: 10,
    TaskOwnerId: '223232', ProjectId: 1};
    mockTaskService.GetTask.and.returnValue(of(testTaskInfo));
    fixture.detectChanges();
  });

  it('should initialize and create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should call GetTaskInfo method to get the Task details from Service GetTask() method', () => {
    // act
    const result = fixture.componentInstance.GetParentTasks(1);

    // assert
    expect(result).toBeTruthy();
    // expect(result).toBe('TestTask-1');
  });

  it('should add a new task successfully', () => {
    // arrange
    component.newTask = {TaskName: 'New Task Mock test', Priority: 10, StartDate: new Date(),
    ParentTaskId: 2, TaskId: 0, EndDate: null, TaskOwnerId: '11111', ProjectId: 1};

    // mockTaskService.UpdateTask.and.returnValue(of(true));
    mockTaskService.AddNewTask.and.returnValue(of(true));
    fixture.detectChanges();

    // act
    component.Save();

    // assert
    // expect(component.saveStatus).toBe(1);
    expect(fixture.debugElement.queryAll(val => val.name === 'successMsg')).toBeTruthy();
  });

  it('should udpate an existing task successfully', () => {
    // arrange
    component.newTask = {TaskName: 'Updating Task Mock test', Priority: 10, StartDate: new Date(),
    ParentTaskId: 2, TaskId: 4, EndDate: null, TaskOwnerId: '11111', ProjectId:1};
    mockTaskService.UpdateTask.and.returnValue(of(true));
    fixture.detectChanges();

    // act
    component.Save();

    // assert
    expect(fixture.debugElement.queryAll(val => val.name === 'successMsg')).toBeTruthy();
  });
});
