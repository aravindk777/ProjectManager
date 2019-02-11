import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TasksService } from 'src/services/tasks.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockTaskService;

  beforeEach(async(() => {
    mockTaskService = jasmine.createSpyObj(TasksService.name, {'GetTasksCount': of(2)});

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{provide: TasksService, useValue: mockTaskService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a title set', () => {
    expect(component.title).toBe('Task Manager');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
