import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/services/project.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/Model/Users/user.Model';
import { of } from 'rxjs';
import { Projects } from 'src/Model/Projects/projects.model';

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;
  let mockProjectService;
  let mockUserService;
  let mockMatDialogRef: MatDialogRef<EditProjectComponent>;
  let mockSnackBar: MatSnackBar;
  let mockActiveUsers: User[];

  @Component({
    selector: 'app-edit-project',
    template: '<div><mat-card></mat-card></div>'
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

  mockMatDialogRef = jasmine.createSpyObj('dialogRef', ['close']);
  mockSnackBar = jasmine.createSpyObj('matSbStatus', ['open']);

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj(UserService.name, [
      'GetActiveUsers'
    ]);
    mockProjectService = jasmine.createSpyObj(ProjectService.name, [
      'Add',
      'Update'
    ]);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectComponent, TestEditProjectComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [FormsModule],
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: ProjectService, useValue: mockProjectService},
        {provide: MatDialogRef, useValue: mockMatDialogRef},
        {provide: MatSnackBar, usevalue: mockSnackBar}
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
});
