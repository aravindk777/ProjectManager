import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ListUserComponent } from './listuser.component';
import { User } from 'src/Model/Users/user.Model';
import { UserService } from 'src/services/user.service';

describe('ListComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;
  let mockUserService;

  @Component({
    selector: 'app-list-user',
    template: '<div><mat-icon></mat-icon></div>'
  })

  class TestListUserComponent {
    AllUsers: User[];
  }

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj(UserService.name, [
      'AddUser',
      'GetAllUsers',
      'UpateUser'
    ]);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserComponent, TestListUserComponent ],
      imports: [],
      providers: [
        {provide: UserService, useValue: mockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
