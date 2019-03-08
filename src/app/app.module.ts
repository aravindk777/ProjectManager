import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

/* Application loader module */
import { RunnerModule } from './runner.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Application Services */
import { TasksService } from 'src/services/tasks.service';
import { HealthService } from 'src/services/health.service';

/* Application components and modules */
import { HomeComponent } from './home/home.component';
import { AddTaskComponent } from './Tasks/add-task/add-task.component';
import { ViewTasksComponent } from './Tasks/view-tasks/view-tasks.component';
import { ListUserComponent } from './Users/list/listuser.component';
import { ManageUserComponent } from './Users/manage/manageuser.component';
import { ListProjectsComponent } from './Projects/list-projects/list-projects.component';
import { EditProjectComponent } from './Projects/edit-project/edit-project.component';
import { AlertsComponent } from './common/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTasksComponent,
    HomeComponent,
    ManageUserComponent,
    ListUserComponent,
    ListProjectsComponent,
    EditProjectComponent,
    AlertsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RunnerModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  entryComponents: [ManageUserComponent, AlertsComponent],
  providers: [
    HealthService,
    TasksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
