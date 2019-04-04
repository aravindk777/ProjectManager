import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProjectsComponent } from './list-projects.component';
import { ProjectService } from 'src/services/project.service';
import { of } from 'rxjs';
import { MatDialog, MatCardModule, MatToolbarModule } from '@angular/material';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Projects } from 'src/Model/Projects/projects.model';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: (data: boolean) => of({data})
    };
  }
}

describe('ListProjectsComponent', () => {
  let component: ListProjectsComponent;
  let fixture: ComponentFixture<ListProjectsComponent>;
  let mockProjectService;
  let mockProjectsList: Projects[];

  @Component({
    selector: 'app-list-projects',
    template: '<mat-accordion><mat-card><app-project></app-project></mat-card></mat-accordion>'
  })

  class TestListProjectComponent {
    AllProjects: Projects[];
    alertData: AlertInfo;
  }

  mockProjectsList = [
    {ProjectId: 1, ProjectName: 'TestProj1', ManagerId: '11projU', Priority: 1, ProjectStart: new Date(),
    ManagerName: 'TestUser1', ProjectEnd: null, IsActive: true},
    {ProjectId: 2, ProjectName: 'TestProj2', ManagerId: '22projU', Priority: 5, ProjectStart: new Date(2015, 1, 1),
    ManagerName: 'TestUser2', ProjectEnd: new Date(2019,1, 1), IsActive: false},
    {ProjectId: 3, ProjectName: 'TestProj3', ManagerId: '33projU', Priority: 7, ProjectStart: new Date(),
    ManagerName: 'TestUser3', ProjectEnd: null, IsActive: true},
    {ProjectId: 4, ProjectName: 'TestProj4', ManagerId: '44projU', Priority: 15, ProjectStart: new Date(2018, 1, 1),
    ManagerName: 'TestUser4', ProjectEnd: new Date(2020, 1, 1), IsActive: true},
    {ProjectId: 5, ProjectName: 'TestProj5', ManagerId: '55projU', Priority: 20, ProjectStart: new Date(),
    ManagerName: 'TestUser5', ProjectEnd: null, IsActive: true},
    {ProjectId: 6, ProjectName: 'TestProj6', ManagerId: '66projU', Priority: 25, ProjectStart: new Date(2018, 1, 1),
    ManagerName: 'TestUser6', ProjectEnd: new Date(2019,1, 1), IsActive: false}
  ];

  beforeEach(() => {
    mockProjectService = jasmine.createSpyObj(ProjectService.name, [
      'GetAll', 'Get', 'Search'
    ]);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectsComponent, TestListProjectComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [FormsModule, MatCardModule, MatToolbarModule, NoopAnimationsModule],
      providers: [
        {provide: ProjectService, useValue: mockProjectService},
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectsComponent);
    component = fixture.componentInstance;
    mockProjectService.GetAll.and.returnValue(of(mockProjectsList));
    fixture.detectChanges();
  });

  it('should initialize component', () => {
    expect(component).toBeTruthy();
  });
});
