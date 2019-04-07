import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListUserComponent } from './listuser.component';
import { User } from 'src/Model/Users/user.Model';
import { UserService } from 'src/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, EMPTY } from 'rxjs';
import { ManageUserComponent } from '../manage/manageuser.component';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: (data: boolean) => of({data})
    };
  }
}

describe('ListComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;
  let mockUserService;
  let mockMatSnackBar: MatSnackBar;
  let mockUsersList: User[];

  @Component({
    selector: 'app-list-user',
    template: '<div><mat-icon></mat-icon></div>'
  })

  class TestListUserComponent {
    AllUsers: User[];
  }

  beforeEach(async(() => {
    // mock the MatSnackbar component
    mockMatSnackBar = jasmine.createSpyObj('notificationBar', ['Open']);
    // mock Users List
    mockUsersList = [
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

    // mock User Service
    mockUserService = jasmine.createSpyObj(UserService.name, [
      'AddUser',
      'GetUsers',
      'UpdateUser',
      'GetActiveUsers',
      'RemoveUser',
      'SearchUser'
    ]);

    TestBed.configureTestingModule({
      declarations: [ ListUserComponent, TestListUserComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: MatDialog, useClass: MatDialogMock},
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

  it('should be created', () => {
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

  it('should open Add User Dialog component', () => {
    // arrange
    const getAllSpy = spyOn(component, 'GetAllUsers');
    // act
    component.AddUser();
    // assert
    expect(getAllSpy).toHaveBeenCalled();
  });

  it('should open for Edit User Dialog component', () => {
    // arrange
    const getAllSpy = spyOn(component, 'GetAllUsers');
    // act
    component.EditUser(mockUsersList[0]);
    // assert
    expect(getAllSpy).toHaveBeenCalled();
  });

  it('should open for Delete User Dialog component', () => {
    // arrange
    component.alertData = {Body: 'Test Message',Header: 'Testing', ConfirmPopup: true};
    mockUserService.RemoveUser.and.returnValue(of(true));
    const getAllSpy = spyOn(component, 'GetAllUsers');
    // act
    component.EditUser(mockUsersList[0]);
    // assert
    expect(getAllSpy).toHaveBeenCalled();
  });

  it('should search Users', () => {
    // arrange
    component._searchKeyword = 'UserLastName';
    mockUserService.SearchUser.and.returnValue(of(mockUsersList.filter(u => u.LastName === component._searchKeyword)));
    // act
    component.Search(component.searchKeyword);
    // assert
    expect(component.AllUsers).toBeTruthy();
    expect(component.AllUsers.length).toEqual(2);
  });

  it('should sort Users by FirstName', () => {
    // arrange
    component.sortParam = 'FirstName';
    const testIndex = 3;
    // act
    component.Sort();
    // assert
    expect(component.AllUsers[testIndex].UserId).toEqual(mockUsersList[testIndex].UserId);
  });

  it('should sort Users by LastName', () => {
    // arrange
    component.sortParam = 'LastName';
    const testIndex = 3;
    // act
    component.Sort();
    // assert
    expect(component.AllUsers[testIndex].UserId).toEqual(mockUsersList[testIndex].UserId);
  });
});
