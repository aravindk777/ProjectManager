import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProjectComponent } from './edit-project.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatSelectModule, MatFormFieldModule, MatSliderModule, MatInputModule } from '@angular/material';
import { ProjectService } from 'src/services/project.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/Model/Users/user.Model';
import { of, EMPTY } from 'rxjs';
import { Projects } from 'src/Model/Projects/projects.model';
import { LoggerService } from 'src/services/logger.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export class MatSnackBarMock {
  open() {
    return {EMPTY};
  }
}

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;
  let mockProjectService;
  let mockUserService;
  let mockMatDialogRef: MatDialogRef<EditProjectComponent>;
  let mockSnackBar;
  let mockActiveUsers: User[];
  let mockLoggerService;

  @Component({
    selector: 'app-edit-project',
    template: '<div><mat-card><mat-form-field><mat-label>Testing EditProject</mat-label></mat-form-field></mat-card></div>'
  })

  class TestEditProjectComponent {
    activeUsers: User[];
    projectToSave: Projects;
  }

  mockActiveUsers = [
    {Id: '11111111', FirstName: 'User1FirstName', LastName: 'User1LastName', UserId: 'TestUser1', FullName: 'User1FullName', Active: true },
    {Id: '33333333', FirstName: 'User3FirstName', LastName: 'User3LastName', UserId: 'TestUser3', FullName: 'User3FullName', Active: true },
    {Id: '55555555', FirstName: 'User5FirstName', LastName: 'User5LastName', UserId: 'TestUser5', FullName: 'User5FullName', Active: true },
    {Id: '66666666', FirstName: 'User6FirstName', LastName: 'User6LastName', UserId: 'TestUser6', FullName: 'User6FullName', Active: true },
  ];

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj(UserService.name, [
      'GetActiveUsers'
    ]);
    mockProjectService = jasmine.createSpyObj(ProjectService.name, [
      'Add',
      'Update'
    ]);
    mockLoggerService = jasmine.createSpyObj(LoggerService.name, ['LogInformation']);
    mockMatDialogRef = jasmine.createSpyObj('dialogRef', ['close']);
    mockSnackBar = jasmine.createSpyObj(MatSnackBar.name, ['open']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectComponent, TestEditProjectComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [FormsModule, MatSelectModule, MatFormFieldModule, MatSliderModule, MatInputModule, NoopAnimationsModule],
      providers: [
        {provide: LoggerService, useValue: mockLoggerService},
        {provide: UserService, useValue: mockUserService},
        {provide: ProjectService, useValue: mockProjectService},
        {provide: MatDialogRef, useValue: mockMatDialogRef},
        {provide: MatSnackBar, useClass: MatSnackBarMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    // arrange activeUsers
    mockUserService.GetActiveUsers.and.returnValue(of(mockActiveUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get active users', () => {
    // act
    component.GetActiveUsersList();
    fixture.detectChanges();
    // assert
    expect(component.activeUsers.length).toEqual(4);
  });

  it('should save a new project', () => {
    // arrange
    const newProject = {ProjectName: 'TestNewProject', ManagerId: '232adfdf3', Priority: 10, ProjectEnd: null,
                        ProjectStart: new Date(), IsActive: null, ProjectId: undefined, ManagerName: ''};
    component.projectToSave = newProject;
    const savedProject = {ProjectName: 'TestNewProject', ManagerId: '232adfdf3', Priority: 10,
                          ProjectStart: new Date(), IsActive: true, ProjectId: 10, ManagerName: 'TestUser5'};
    const result = mockProjectService.Add.and.returnValue(of(savedProject));
    // act
    component.Save();
    // assert
    expect(result).toBeTruthy();
  });

  it('should update an existing project', () => {
    // arrange
    component.projectToSave = {ProjectName: 'UpdatedNewProject', ManagerId: '232adfdf3', Priority: 15, ProjectEnd: null,
                                ProjectStart: new Date(), IsActive: null, ProjectId: 10, ManagerName: ''};
    const result = mockProjectService.Update.and.returnValue(of(true));
    // act
    component.Save();
    // assert
    expect(result).toBeTruthy();
  });
});
