import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { ManageUserComponent } from './Users/manage/manageuser.component';
import { ListUserComponent } from './Users/list/listuser.component';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { AddTaskComponent } from './Tasks/add-task/add-task.component';
import { ViewTasksComponent } from './Tasks/view-tasks/view-tasks.component';
import { ListProjectsComponent } from './Projects/list-projects/list-projects.component';
import { EditProjectComponent } from './Projects/edit-project/edit-project.component';
import { RunnerModule } from './runner.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        AppRoutingModule,
        RunnerModule
      ],
      declarations: [
        AppComponent,
        ManageUserComponent,
        ListUserComponent,
        HomeComponent,
        AddTaskComponent,
        ViewTasksComponent,
        ListProjectsComponent,
        EditProjectComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Project Manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Project Manager');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Project Manager');
  });
});
