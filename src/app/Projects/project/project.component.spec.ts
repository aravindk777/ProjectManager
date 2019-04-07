import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ProjectService } from 'src/services/project.service';
import { of } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Projects } from 'src/Model/Projects/projects.model';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  public open(inputdata: any) {
    return {
      afterClosed: () => of({inputdata})
    };
  }
}

export class MockMatSnackBar {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  public open(msg: string, action?: string) {
    return true;
  }
}

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  const mockProjectService = jasmine.createSpyObj(ProjectService.name, ['GetTasksForProject', 'Delete']);
  let mockTasks: ViewTasks[];

  @Component({
    selector: 'app-list-projects',
    template: '<mat-accordion><mat-card><app-project></app-project></mat-card></mat-accordion>'
  })

  class TestProjectCardComponent {
    ItemSource: Projects;
    CardSource: Projects[];
    ProjectName: string;
    alertData: AlertInfo;
    loadingInProgress = true;
    project: Projects;
    TaskCount = 0;
    CompletedTasks = 0;
    tasksInfoLoading = true;
  }

  mockTasks = [
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent , TestProjectCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: ProjectService, useValue: mockProjectService},
        {provide: MatDialog, useClass: MatDialogMock},
        {provide: MatSnackBar, useClass: MockMatSnackBar}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    const projectId = 1;
    mockProjectService.GetTasksForProject.and.returnValue(of(mockTasks.filter(p => p.ProjectId === projectId)));
    component.ItemSource = {ProjectId: projectId, ProjectName: 'Project1', Priority: 10, ProjectStart: new Date(), ProjectEnd: null,
                        ManagerId: '123abc1', ManagerName: 'TestUser1', IsActive: true};
    fixture.detectChanges();
  });

  it('should initialize the Project Card Component', () => {
    expect(component).toBeTruthy();
  });

  it('should call GetTasks for the Project by Id (Id: 1 as sample)', () => {
    // act
    component.GetTasksForProjectAsync(component.project.ProjectId);
    // assert
    expect(component.TaskCount).toEqual(3);
    expect(component.CompletedTasks).toEqual(1);
  });

  it('should Edit a project by opening the Edit dialog', () => {
    // arrange
    component.project = {ProjectId: 10, ProjectName: 'ExistingProject', Priority: 10, ProjectStart: new Date(),
                        ProjectEnd: null, ManagerId: '456add78', ManagerName: 'TestUser10', IsActive: true};
    const mockEditDialogObj = MatDialogMock.prototype;
    let dialogRef = jasmine.createSpyObj(mockEditDialogObj.open.name, ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(component.project));
    // act
    component.EditProject(component.project);
    dialogRef = mockEditDialogObj.open(component.project);
    const result = dialogRef.afterClosed();
    // assert
    expect(dialogRef).toBeTruthy();
    expect(result).toBeTruthy();
  });

  it('should show alert confirmation for Deleting and remove a project', () => {
    // arrange
    component.alertData = new AlertInfo();
    component.alertData.ConfirmPopup = true;
    component.alertData.Body = 'Testing for alert message. Can you confirm ?';
    const projectIdtoDelete = 10;
    const mockAlertDialogObj = MatDialogMock.prototype;
    let dialogRef = jasmine.createSpyObj(mockAlertDialogObj.open.name, ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(true));
    mockProjectService.Delete.and.returnValue(of(true));
    // act
    component.Delete(projectIdtoDelete);
    dialogRef = mockAlertDialogObj.open(component.alertData);
    const result = dialogRef.afterClosed();
    console.log(result);
    // assert
    expect(dialogRef).toBeTruthy();
    expect(result).toBeTruthy();
  });
});
