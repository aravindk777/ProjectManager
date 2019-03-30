import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserComponent } from './manageuser.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from 'src/Model/Users/user.Model';

describe('ManageComponent', () => {
  let component: ManageUserComponent;
  let fixture: ComponentFixture<ManageUserComponent>;
  let mockUserService: UserService;
  let mockMatDialogRef: MatDialogRef<ManageUserComponent>;
  let mockSnackBarObj;
  let mockUserInstance: User;

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
});
