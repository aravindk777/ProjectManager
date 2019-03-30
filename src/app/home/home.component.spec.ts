import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { HealthService } from 'src/services/health.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHealthService;

  beforeEach(async(() => {
    mockHealthService = jasmine.createSpyObj(HealthService.name, {'ServiceAvailable': of(true)});

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{provide: HealthService, useValue: mockHealthService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a title set', () => {
    expect(component.title).toBe('Project Manager');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
