import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListUserComponent } from './listuser.component';
import { User } from 'src/Model/Users/user.Model';
import { UserService } from 'src/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { ManageUserComponent } from '../manage/manageuser.component';
import { AlertsComponent } from 'src/app/common/alerts.component';

describe('ListComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;
  let mockUserService;
  let mockMatAddEditDialog: MatDialog, mockAlertDialog: MatDialog;
  let mockMatSnackBar: MatSnackBar;
  let mockUsersList: User[];

  @Component({
    selector: 'app-list-user',
    template: '<div><mat-icon></mat-icon></div>'
  })

  class TestListUserComponent {
    AllUsers: User[];
  }

  mockUsersList = [
    {Id: '11111111', FirstName: 'User1FirstName', LastName: 'User1LastName', UserId: 'TestUser1', FullName: 'User1FullName', Active: true },
    {Id: '22222222', FirstName: 'User2FirstName', LastName: 'User2LastName',
    UserId: 'TestUser2', FullName: 'User2FullName', Active: false },
    {Id: '33333333', FirstName: 'User3FirstName', LastName: 'User3LastName', UserId: 'TestUser3', FullName: 'User3FullName', Active: true },
    {Id: '44444444', FirstName: 'User4FirstName', LastName: 'User4LastName',
    UserId: 'TestUser4', FullName: 'User4FullName', Active: false },
    {Id: '55555555', FirstName: 'User5FirstName', LastName: 'User5LastName', UserId: 'TestUser5', FullName: 'User5FullName', Active: true },
    {Id: '66666666', FirstName: 'User6FirstName', LastName: 'User6LastName', UserId: 'TestUser6', FullName: 'User6FullName', Active: true },
  ];

  // mock the AddEditDialog component
  mockMatAddEditDialog = jasmine.createSpyObj('ManageUserComponent', [
    {'Open': of(ManageUserComponent, of(MatDialogConfig))}
  ]);

  // mock the Alert component
  mockAlertDialog = jasmine.createSpyObj('AlertsComponent', [
    {'Open': of(AlertsComponent, of(MatDialogConfig))}
  ]);

  // mock the MatSnackbar component
  mockMatSnackBar = jasmine.createSpyObj('notificationBar', [{'Open': of()}]);

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj(UserService.name, [
      'AddUser',
      'GetUsers',
      'UpateUser',
      'GetActiveUsers',
      'RemoveUser',
      'SearchUser'
    ]);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserComponent, TestListUserComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: MatDialog, useValue: mockMatAddEditDialog},
        {provide: MatDialog, useValue: mockAlertDialog},
        {provide: MatSnackBar, useValue: mockMatSnackBar}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    // Arrange GetAllUsers
    mockUserService.GetUsers.and.returnValue(of(mockUsersList));
    mockUserService.GetActiveUsers.and.returnValue(of(mockUsersList.filter(items => items.Active)));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Get All users', () => {
    // act
    component.GetAllUsers(false);
    fixture.detectChanges();
    // assert
    expect(component.AllUsers.length).toBe(mockUsersList.length);
  });

  it('should Get only Active users', () => {
    // act
    component.GetAllUsers(true);
    fixture.detectChanges();
    // assert
    expect(component.AllUsers.length).toBe(mockUsersList.filter(d => d.Active).length);
  });
});
