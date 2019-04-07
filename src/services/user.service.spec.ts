import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/Model/Users/user.Model';
import { of } from 'rxjs';

describe('UserService', () => {
  let mockUserService;
  let mockUsers: User[];
  let mockNewUser: User;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [UserService]
  })
  );

  mockUserService = jasmine.createSpyObj(['GetUsers', 'GetActiveUsers', 'AddUser', 'UpdateUser', 'RemoveUser', 'SearchUser']);

  mockUsers = [
    {FirstName: 'First1', LastName: 'Last1', Id: '11UU11', UserId: 'TestUser1', Active: true, FullName: 'First1 Last1' },
    {FirstName: 'First2', LastName: 'Last2', Id: '22UU22', UserId: 'TestUser2', Active: true, FullName: 'First2 Last2' },
    {FirstName: 'First3', LastName: 'Last3', Id: '33UU33', UserId: 'TestUser3', Active: false, FullName: 'First3 Last3' },
    {FirstName: 'First4', LastName: 'Last4', Id: '44UU44', UserId: 'TestUser4', Active: true, FullName: 'First4 Last4' },
    {FirstName: 'First5', LastName: 'Last5', Id: '55UU55', UserId: 'TestUser5', Active: false, FullName: 'First5 Last5' },
  ];

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('Should get All Users', inject([UserService], (svc: UserService) => {
    mockUserService.GetUsers.and.returnValue(of(mockUsers));
    const actual = svc.GetUsers();
    expect(actual).toBeTruthy();
  }));

  it('Should get Active Users', inject([UserService], (svc: UserService) => {
    mockUserService.GetActiveUsers.and.returnValue(of(mockUsers.filter(u => u.Active)));
    const actual = svc.GetActiveUsers();
    expect(actual).toBeTruthy();
  }));

  it('Should add a new User', inject([UserService], (svc: UserService) => {
    // arrange
    mockNewUser = {UserId: 'NewTestUser', FirstName: 'NewFirst', LastName: 'NewLast', Id: '12345DD',
    FullName: 'NewFirst NewLast', Active: true };
    mockUserService.AddUser.and.returnValue(of(mockNewUser));
    // act
    const actual = svc.AddUser(mockNewUser);
    // assert
    expect(actual).toBeTruthy();
  }));

  it('Should be able to Search a User', inject([UserService], (svc: UserService) => {
    // arrange
    const searchText = 'TestUser';
    mockUserService.SearchUser.and.returnValue(of(mockUsers.filter(u => u.UserId.indexOf(searchText) > 0)));
    const actual = svc.SearchUser(searchText);
    expect(actual).toBeTruthy();
  }));

  it('Should Update an User', inject([UserService], (svc: UserService) => {
    // arrange
    const expectedResult = true;
    const userIdToEdit = 'TestUser5';
    const userToEdit = {UserId: userIdToEdit, FirstName: 'updatedFirstName', LastName: 'UpdatedLastName', Id: '55UU55',
    Active: true, FullName: 'updatedFirstName UpdatedLastname'};
    mockUserService.UpdateUser.and.returnValue(of(expectedResult));

    // act
    const actual = svc.UpdateUser(userIdToEdit, userToEdit);

    // Assert
    expect(actual).toBeTruthy();
  }));

  it('Should Remove an User by UserId', inject([UserService], (svc: UserService) => {
    // arrange
    const expectedResult = true;
    const userIdToRemove = 'TestUser3';
    mockUserService.RemoveUser.and.returnValue(of(expectedResult));
    // act
    const actual = svc.RemoveUser(userIdToRemove);
    // assert
    expect(actual).toBeTruthy();
  }));
});
