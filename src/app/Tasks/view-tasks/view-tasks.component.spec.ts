import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTasksComponent } from './view-tasks.component';
import { FormsModule } from '@angular/forms';
import { Component, Directive, Input, HostListener, NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { TasksService } from 'src/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
})
class MockRouterLinkDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('routerLink') linkParams: string;
  navigatedTo: any = null;
  @HostListener('click') onClick() { this.navigatedTo = this.linkParams; }
}

describe('ViewTasksComponent', () => {
  let component: ViewTasksComponent;
  let fixture: ComponentFixture<ViewTasksComponent>;
  let mockTaskService, mockActivatedRoute, mockRouter, mockParams;
  let mockedAllTasksData: ViewTasks[];

  @Component({
    selector: 'app-view-tasks',
    template: '<div></div>'
  })

  class TestViewTasksComponent {
    AllTasks: ViewTasks[];
    totalTasks: number;
    pageIndex = 1;
    pageSize: number = environment.PageSize;
    pages: number;
  }

  beforeEach(async(() => {
    // mock the params value
    mockParams = jasmine.createSpyObj(['page']);

    // mock Task Service and methods
    mockTaskService = jasmine.createSpyObj(TasksService.name, [
      'GetTasksCount',
      'GetTask',
      {'GetParents': of()},
      {'UpdateTask': of()},
      'GetAllTasks',
      'EndTask'
    ]);

    // mock Activated Route
    mockActivatedRoute = {params: of(mockParams)}; // {queryParams: {Params: () => 1}};

    // mock Router
    mockRouter = {navigate: {}};

    // ViewTask data
    mockedAllTasksData = [
      {TaskId: 1, TaskName: 'TestTask-1', ParentTask: '', StartDate: new Date(),
      EndDate: new Date(), Priority: 10, Status: '', PriorityText: '', Active: false},
      {TaskId: 2, TaskName: 'TestTask-2', ParentTask: 'TestTask-1', StartDate: new Date(),
      EndDate: new Date(2019, 3, 31), Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 3, TaskName: 'TestTask-3', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 4, TaskName: 'TestTask-4', ParentTask: 'TestTask-3', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 5, TaskName: 'TestTask-5', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 6, TaskName: 'TestTask-6', ParentTask: 'TestTask-5', StartDate: new Date(2018, 12, 29),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 7, TaskName: 'TestTask-7', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 8, TaskName: 'TestTask-8', ParentTask: 'TestTask-7', StartDate: new Date(2018, 9, 1),
      EndDate: new Date(), Priority: 10, Status: '', PriorityText: '', Active: false},
      {TaskId: 9, TaskName: 'TestTask-9', ParentTask: '', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true},
      {TaskId: 10, TaskName: 'TestTask-10', ParentTask: 'TestTask-9', StartDate: new Date(),
      EndDate: null, Priority: 10, Status: '', PriorityText: '', Active: true}
    ];

    TestBed.configureTestingModule({
      imports: [ FormsModule],
      declarations: [ ViewTasksComponent, TestViewTasksComponent, MockRouterLinkDirective ],
      providers: [
        {provide: TasksService, useValue: mockTaskService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  // global arrange
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTasksComponent);
    component = fixture.componentInstance;
    // global arrange
    mockTaskService.GetTasksCount.and.returnValue(of(20));
    mockTaskService.GetAllTasks.and.returnValue(of(mockedAllTasksData.slice(component.pageIndex - 1, component.pageSize)));
    fixture.detectChanges();
  });

  // basic act and assert
  it('should initialize and create ViewTaskComponent', () => {
    expect(component).toBeTruthy();
  });

  // - GetTasks method test
  it('should get All the Tasks as mentioned by PageSize value', () => {
    // act
    component.GetAllTasks(component.pageIndex, component.pageSize);
    fixture.detectChanges();
    // assert
    expect(component.AllTasks.length).toBe(component.pageSize);
  });

  it('should end a task with success', () => {
    // arrange
    mockTaskService.EndTask.and.returnValue(of(true));
    mockTaskService.GetAllTasks.and.returnValue(of(mockedAllTasksData.slice(component.pageIndex - 1, component.pageSize)));
    // act
    const result = component.EndTask(2, true);
    fixture.detectChanges();
    // assert
    expect(result).toBe(true);
    console.log('End Task test completed!');
  });

  it('should search for a task with parent task named "TestTask"', () => {
    // arrange
    const parentFilterTest = 'TestTask';
    const filteredMockData = mockedAllTasksData.filter(tasks => tasks.ParentTask.indexOf(parentFilterTest) >= 0);
    component.parentTaskFilter = parentFilterTest;
    mockTaskService.GetAllTasks.and.returnValue(of(filteredMockData));
    // act
    component.Search();
    fixture.detectChanges();
    // assert
    expect(component.AllTasks.length).toBe(5);
  });

  it('should search for a task with name "TestTask-1"', () => {
    // arrange
    const taskNameFilterText = 'TestTask-1';
    const filteredMockData = mockedAllTasksData.filter(tasks => tasks.TaskName.indexOf(taskNameFilterText) >= 0);
    component.taskNameFilter = taskNameFilterText;
    mockTaskService.GetAllTasks.and.returnValue(of(filteredMockData));
    // act
    component.Search();
    fixture.detectChanges();
    // assert
    expect(component.AllTasks.length).toBe(2);
  });
});
