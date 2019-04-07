import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';
import { Projects } from 'src/Model/Projects/projects.model';
import { of } from 'rxjs';

describe('ProjectService', () => {
  let mockProjectService;
  let mockProjects: Projects[];
  let mockNewProject: Projects;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [ProjectService]
  }));

  mockProjects = [
    {ProjectId: 1, ProjectName: 'TestProject1', Priority: 1, ProjectStart: new Date(), ProjectEnd: null,
    ManagerId: '11111', ManagerName: 'TestUser1', IsActive: true},
    {ProjectId: 2, ProjectName: 'TestProject2', Priority: 2, ProjectStart: new Date(), ProjectEnd: null,
    ManagerId: '22222', ManagerName: 'TestUser2', IsActive: false},
    {ProjectId: 3, ProjectName: 'TestProject3', Priority: 3, ProjectStart: new Date(), ProjectEnd: null,
    ManagerId: '33333', ManagerName: 'TestUser3', IsActive: true},
    {ProjectId: 4, ProjectName: 'TestProject4', Priority: 4, ProjectStart: new Date(), ProjectEnd: null,
    ManagerId: '44444', ManagerName: 'TestUser4', IsActive: false},
    {ProjectId: 5, ProjectName: 'TestProject5', Priority: 5, ProjectStart: new Date(), ProjectEnd: null,
    ManagerId: '55555', ManagerName: 'TestUser5', IsActive: true},
  ];

  mockNewProject = {ProjectId: 6, ProjectName: 'TestProject6', Priority: 6, ProjectStart: new Date(), ProjectEnd: null,
  ManagerId: '55555', ManagerName: 'TestUser5', IsActive: true};

  mockProjectService = jasmine.createSpyObj(['Add', 'GetAll', 'Get', 'Update', 'Delete', 'GetTasksForProject', 'Search']);

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('Should get All Projects', inject([ProjectService], (svc: ProjectService) => {
    mockProjectService.GetAll.and.returnValue(of(mockProjects));
    const actual = svc.GetAll();
    expect(actual).toBeTruthy();
  }));

  it('Should add a new Project', inject([ProjectService], (svc: ProjectService) => {
    mockProjectService.Add.and.returnValue(of(mockNewProject));
    const actual = svc.Add(mockNewProject);
    expect(actual).toBeTruthy();
  }));

  it('Should get a Project by Id', inject([ProjectService], (svc: ProjectService) => {
    mockProjectService.Get.and.returnValue(of(mockProjects[0]));
    const actual = svc.Get(1);
    expect(actual).toBeTruthy();
  }));

  it('Should Update a Project', inject([ProjectService], (svc: ProjectService) => {
    // assert
    const expectedResult = true;
    mockProjectService.Update.and.returnValue(of(expectedResult));
    const projectToUpdate = {ProjectId: 4, ProjectName: 'UpdatedProject4', Priority: 16, ProjectStart: new Date(), ProjectEnd: null,
    ManagerId: '55555', ManagerName: 'TestUser5', IsActive: true};
    // act
    const actual = svc.Update(projectToUpdate);
    // assert
    expect(actual).toBeTruthy();
  }));

  it('Should End/Delete a Project', inject([ProjectService], (svc: ProjectService) => {
    // assert
    const expectedResult = true;
    const projectIdToEnd = 4;
    mockProjectService.Delete.and.returnValue(of(expectedResult));
    // act
    const actual = svc.Delete(projectIdToEnd);
    // assert
    expect(actual).toBeTruthy();
  }));

  it('Should search Projects by keyword', inject([ProjectService], (svc: ProjectService) => {
    mockProjectService.Search.and.returnValue(of(mockProjects));
    const searchKeyWord = 'TestProject';
    const actual = svc.Search(searchKeyWord);
    expect(actual).toBeTruthy();
  }));

  it('Should get all Tasks for a specific Project by Id', inject([ProjectService], (svc: ProjectService) => {
    mockProjectService.GetTasksForProject.and.returnValue(of(mockProjects));
    const projectIdToGet = 3;
    const actual = svc.GetTasksForProject(projectIdToGet);
    expect(actual).toBeTruthy();
  }));
});
