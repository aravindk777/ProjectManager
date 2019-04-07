import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTasksComponent } from './view-tasks.component';
import { FormsModule } from '@angular/forms';
import { Component, Directive, Input, HostListener, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { TasksService } from 'src/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatSnackBarModule, MatTableModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AlertInfo } from 'src/Model/common/alert-info.model';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open(inputData: any) {
    return {
      afterClosed: () => of(true)
    };
  }
}

export class MatSnackBarMock {
  open(msg: any) {
    return true;
  }
}

describe('ViewTasksComponent', () => {
  let component: ViewTasksComponent;
  let fixture: ComponentFixture<ViewTasksComponent>;
  let mockTaskService;
  let mockedAllTasksData: ViewTasks[];

  @Component({
    selector: 'app-view-tasks',
    template: '<div></div>'
  })

  class TestViewTasksComponent {
    AllTasks: ViewTasks[];
    totalTasks: number;
    pageSize: number = environment.PageSize;
    pages: number;
  }

  beforeEach(async(() => {
    // mock Task Service and methods
    mockTaskService = jasmine.createSpyObj(TasksService.name, [
      'GetTasksCount',
      'GetTask',
      {'GetParents': of()},
      {'UpdateTask': of()},
      'GetAllTasks',
      'EndTask'
    ]);

    // ViewTask data
    mockedAllTasksData = [
      {TaskId: 1, TaskName: 'TestTask-1', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '1', OwnerFullName: 'TestUser1', IsParent: true,
      ProjectId: 1, ProjectName: 'Project1', EndDate: new Date(), Priority: 10, IsActive: false},

      {TaskId: 2, TaskName: 'TestTask-2', ParentTaskName: 'TestTask-1', StartDate: new Date(),
      ParentTaskId: 1, TaskOwnerId: '1', OwnerFullName: 'TestUser1', IsParent: true,
      ProjectId: 1, ProjectName: 'Project1', EndDate: new Date(2019, 3, 31), Priority: 10, IsActive: true},

      {TaskId: 3, TaskName: 'TestTask-3', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '2', OwnerFullName: 'TestUser2', IsParent: true,
      ProjectId: 2, ProjectName: 'Project2', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 4, TaskName: 'TestTask-4', ParentTaskName: 'TestTask-3', StartDate: new Date(),
      ParentTaskId: 3, TaskOwnerId: '2', OwnerFullName: 'TestUser2', IsParent: true,
      ProjectId: 1, ProjectName: 'Project2', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 5, TaskName: 'TestTask-5', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '3', OwnerFullName: 'TestUser3', IsParent: true,
      ProjectId: 3, ProjectName: 'Project3', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 6, TaskName: 'TestTask-6', ParentTaskName: 'TestTask-5', StartDate: new Date(2018, 12, 29),
      ParentTaskId: 5, TaskOwnerId: '31', OwnerFullName: 'TestUser3', IsParent: true,
      ProjectId: 3, ProjectName: 'Project3', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 7, TaskName: 'TestTask-7', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '4', OwnerFullName: 'TestUser4', IsParent: true,
      ProjectId: 4, ProjectName: 'Project4', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 8, TaskName: 'TestTask-8', ParentTaskName: 'TestTask-7', StartDate: new Date(2018, 9, 1),
      ParentTaskId: 7, TaskOwnerId: '4', OwnerFullName: 'TestUser4', IsParent: true,
      ProjectId: 4, ProjectName: 'Project4', EndDate: new Date(), Priority: 10, IsActive: false},

      {TaskId: 9, TaskName: 'TestTask-9', ParentTaskName: '', StartDate: new Date(),
      ParentTaskId: null, TaskOwnerId: '5', OwnerFullName: 'TestUser5', IsParent: true,
      ProjectId: 5, ProjectName: 'Project5', EndDate: null, Priority: 10, IsActive: true},

      {TaskId: 10, TaskName: 'TestTask-10', ParentTaskName: 'TestTask-9', StartDate: new Date(),
      ParentTaskId: 9, TaskOwnerId: '5', OwnerFullName: 'TestUser5', IsParent: true,
      ProjectId: 5, ProjectName: 'Project5', EndDate: null, Priority: 10, IsActive: true}
    ];

    TestBed.configureTestingModule({
      imports: [ FormsModule, MatSnackBarModule, MatTableModule, MatInputModule, MatFormFieldModule, NoopAnimationsModule],
      declarations: [ ViewTasksComponent, TestViewTasksComponent ],
      providers: [
        {provide: TasksService, useValue: mockTaskService},
        {provide: MatDialog, useClass: MatDialogMock},
        {provide: MatSnackBar, useClass: MatSnackBarMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  // global arrange
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTasksComponent);
    component = fixture.componentInstance;
    // global arrange
    mockTaskService.GetTasksCount.and.returnValue(of(20));
    mockTaskService.GetAllTasks.and.returnValue(of(mockedAllTasksData));
    fixture.detectChanges();
  });

  // basic act and assert
  it('should initialize and create ViewTaskComponent', () => {
    expect(component).toBeTruthy();
  });

  // - GetTasks method test
  it('should get All the Tasks', () => {
    // act
    component.GetAllTasks();
    fixture.detectChanges();
    // assert
    expect(component.AllTasks.length).toBe(mockedAllTasksData.length);
  });

  it('should end a task with success', () => {
    // arrange
    const confirmDialogData = new AlertInfo();
    confirmDialogData.ConfirmPopup = true;
    let alertMsg = 'Task will be marked as completed.\n';
    alertMsg = alertMsg.concat('Are you sure ?');
    confirmDialogData.Body = alertMsg;
    mockTaskService.EndTask.and.returnValue(of(true));
    const addedTaskSpy = spyOn(component, 'GetAllTasks');
    // act
    const diagResult = MatDialogMock.prototype.open(confirmDialogData);
    component.EndTask(2, false);
    fixture.detectChanges();
    // assert
    expect(addedTaskSpy).toHaveBeenCalled();
    expect(diagResult).toBeTruthy();
  });

  it('should open AddDialog for adding a new task', () => {
    // arrange
    const addedTaskSpy = spyOn(component, 'GetAllTasks');
    // act
    component.AddTask();
    // assert
    expect(addedTaskSpy).toHaveBeenCalled();
  });

  it('should open AddDialog for editing an existing task', () => {
    // arrange
    const updatedTaskSpy = spyOn(component, 'GetAllTasks');
    // act
    component.EditTask(mockedAllTasksData[0]);
    // assert
    expect(updatedTaskSpy).toHaveBeenCalled();
  });
});
