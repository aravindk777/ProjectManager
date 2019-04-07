import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { TasksService } from 'src/services/tasks.service';
import { of } from 'rxjs';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/Model/Tasks/task.model';
import { UserService } from 'src/services/user.service';
import { ProjectService } from 'src/services/project.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule, MatSliderModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Projects } from 'src/Model/Projects/projects.model';
import { User } from 'src/Model/Users/user.Model';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let mockTaskService;
  let mockUserServie;
  let mockProjectService;
  let mockProjectsList: Projects[];
  let mockedParentTasks: ViewTasks[];
  let mockActiveUsers: User[];
  let mockMatDialogRef: MatDialogRef<TestAddTaskComponent>;

  @Component({
    selector: 'app-add-task',
    template: '<mat-card><mat-form-field><mat-label>Testing Add or Edit Task</mat-label></mat-form-field></mat-card>'
  })

  class TestAddTaskComponent {
    newTask: Task;
    taskId: number;
    parents: ViewTasks[];
    pageTitle: string;
    saveStatus = 0;
    taskToEdit?: Task;
  }

  beforeEach(async(() => {
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

    // mock Projects
    mockProjectsList = [
      {ProjectId: 1, ProjectName: 'TestProj1', ManagerId: '11projU', Priority: 1, ProjectStart: new Date(),
      ManagerName: 'TestUser1', ProjectEnd: null, IsActive: true},
      {ProjectId: 2, ProjectName: 'TestProj2', ManagerId: '22projU', Priority: 5, ProjectStart: new Date(2015, 1, 1),
      ManagerName: 'TestUser2', ProjectEnd: new Date(2019, 1, 1), IsActive: false},
      {ProjectId: 3, ProjectName: 'TestProj3', ManagerId: '33projU', Priority: 7, ProjectStart: new Date(),
      ManagerName: 'TestUser3', ProjectEnd: null, IsActive: true},
      {ProjectId: 4, ProjectName: 'TestProj4', ManagerId: '44projU', Priority: 15, ProjectStart: new Date(2018, 1, 1),
      ManagerName: 'TestUser4', ProjectEnd: new Date(2020, 1, 1), IsActive: true},
      {ProjectId: 5, ProjectName: 'TestProj5', ManagerId: '55projU', Priority: 20, ProjectStart: new Date(),
      ManagerName: 'TestUser5', ProjectEnd: null, IsActive: true},
      {ProjectId: 6, ProjectName: 'TestProj6', ManagerId: '66projU', Priority: 25, ProjectStart: new Date(2018, 1, 1),
      ManagerName: 'TestUser6', ProjectEnd: new Date(2019, 1, 1), IsActive: false}
    ];

    // mock Users
    mockActiveUsers = [
      {Id: '11111111', FirstName: 'fUser1FirstName', LastName: 'User1LastName',
      UserId: 'TestUser1', FullName: 'User1FullName', Active: true },
      {Id: '22222222', FirstName: 'eUser2FirstName', LastName: 'UserLastName',
      UserId: 'TestUser2', FullName: 'User2FullName', Active: false },
      {Id: '33333333', FirstName: 'dUser3FirstName', LastName: 'User3LastName',
      UserId: 'TestUser3', FullName: 'User3FullName', Active: true },
      {Id: '44444444', FirstName: 'cUser4FirstName', LastName: 'UserLastName',
      UserId: 'TestUser4', FullName: 'User4FullName', Active: false },
      {Id: '55555555', FirstName: 'bUser5FirstName', LastName: 'User5LastName',
      UserId: 'TestUser5', FullName: 'User5FullName', Active: true },
      {Id: '66666666', FirstName: 'aUser6FirstName', LastName: 'User6LastName',
      UserId: 'TestUser6', FullName: 'User6FullName', Active: true },
    ];

    // mock Task Service and methods
    mockTaskService = jasmine.createSpyObj(TasksService.name, ['GetTask', 'GetParents', 'UpdateTask', 'AddNewTask']);

    // mock User service methods
    mockUserServie = jasmine.createSpyObj(UserService.name, ['GetActiveUsers']);

    // mock Project Service methods
    mockProjectService = jasmine.createSpyObj(ProjectService.name, ['GetAll']);

    // mock DialogRef object
    mockMatDialogRef = jasmine.createSpyObj('dialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent, TestAddTaskComponent ],
      imports: [FormsModule, MatDialogModule, MatSelectModule, MatSliderModule, MatInputModule, MatFormFieldModule, NoopAnimationsModule],
      providers: [
        {provide: TasksService, useValue: mockTaskService},
        {provide: ProjectService, useValue: mockProjectService},
        {provide: UserService, useValue: mockUserServie},
        {provide: MatDialogRef, useValue: mockMatDialogRef}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    mockTaskService.GetParents.and.returnValue(of(mockedParentTasks));
    mockProjectService.GetAll.and.returnValue(of(mockProjectsList));
    mockUserServie.GetActiveUsers.and.returnValue(of(mockActiveUsers));
    fixture.detectChanges();
    console.log(component.parents.length);
  });

  it('should initialize and create the component', () => {
    component.newTask = {TaskId: 0, TaskName: '', TaskOwnerId: null, ParentTaskId: 0,
                        ProjectId: 0, EndDate: null, Priority: null, StartDate: null};
    // assert
    expect(component).toBeTruthy();
  });

  it('should call Get Active Users List method', () => {
    // act
    fixture.componentInstance.GetActiveUsersList();
    // assert
    expect(component.activeUsers.length).toEqual(mockActiveUsers.length);
  });

  it('should get Projects listing for adding a task under a project', () => {
    // act
    component.GetProjectInfo();
    // assert
    expect(component.projects.length).toEqual(mockProjectsList.length);
  });

  it('should get Parent tasks only', () => {
    // arrange
    const testTaskId = 2;
    // act
    component.GetParentTasks(testTaskId);
    // assert
    expect(component.parents.length).toEqual(mockedParentTasks.length);
  });

  it('should save a new Task info', () => {
    // arrange
    component.newTask = {TaskId: 0, TaskName: 'TestNewTask', Priority: 5, TaskOwnerId: '1122de1',
                        StartDate: new Date(), EndDate: null, ProjectId: 1, ParentTaskId: 3};
    const savedNewTask = {TaskId: 11, TaskName: 'TestNewTask', Priority: 5, TaskOwnerId: '1122de1',
    StartDate: new Date(), EndDate: null, ProjectId: 1, ParentTaskId: 3};
    mockTaskService.AddNewTask.and.returnValue(of(savedNewTask));
    // act
    component.Save();
    // assert
    expect(component.workInProgress).toEqual(false);
  });

  it('should save an existing Task info', () => {
    // arrange
    component.newTask = {TaskId: 3, TaskName: 'UpdatedtestTask', Priority: 5, TaskOwnerId: '1122de1',
                        StartDate: new Date(), EndDate: null, ProjectId: 5, ParentTaskId: 3};
    mockTaskService.UpdateTask.and.returnValue(of(true));
    // act
    component.Save();
    // assert
    expect(component.workInProgress).toEqual(false);
  });
});
