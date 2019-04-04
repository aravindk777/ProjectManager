import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ManageUserComponent } from './manageuser.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from 'src/Model/Users/user.Model';
import { of } from 'rxjs';

describe('ManageComponent', () => {
  let component: ManageUserComponent;
  let fixture: ComponentFixture<ManageUserComponent>;
  let mockUserService;
  let mockMatDialogRef;
  let mockSnackBarObj;
  let mockUserInstance: User;

  beforeEach(async(() => {
    mockUserService = jasmine.createSpyObj(UserService.name, [
      'AddUser',
      'GetUsers',
      'UpdateUser',
      'GetActiveUsers',
      'RemoveUser',
      'SearchUser'
    ]);
    mockSnackBarObj = jasmine.createSpyObj(MatSnackBar.name, ['open']);
    mockMatDialogRef = jasmine.createSpyObj(MatDialogRef.name, ['close']);

    TestBed.configureTestingModule({
      declarations: [ ManageUserComponent ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {provide: UserService, useValue: mockUserService },
        {provide: MatDialogRef, useValue: mockMatDialogRef },
        {provide: MatSnackBar, useValue: mockSnackBarObj },
        {provide: User, useValue: mockUserInstance}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should save by adding new user', () => {
    // arrange
    mockUserInstance = {Id: '', FirstName: 'TestFirst', LastName: 'TestLast',
    UserId: 'TestUserNew', Active: true, FullName: 'TestFirst TestLast'};
    component.user = mockUserInstance;
    mockUserService.AddUser.and.returnValue(of(mockUserInstance));
    mockSnackBarObj.open.and.returnValue();
    mockMatDialogRef.close.and.returnValue(true);
    // act
    component.SaveUser();
    // assert
    expect(component.workInProgress).toEqual(false);
  });

  it('Should Update an existing user', () => {
    // arrange
    mockUserInstance = {Id: '111222', FirstName: 'TestFirst', LastName: 'TestLast',
    UserId: 'TestUserNew', Active: true, FullName: 'TestFirst TestLast'};
    component.user = mockUserInstance;
    mockUserService.UpdateUser.and.returnValue(of(true));
    mockSnackBarObj.open.and.returnValue();
    mockMatDialogRef.close.and.returnValue(true);
    // act
    component.SaveUser();
    // assert
    expect(component.workInProgress).toEqual(false);
  });
});
