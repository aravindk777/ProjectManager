import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { TasksService } from 'src/services/tasks.service';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './Tasks/add-task/add-task.component';
import { ViewTasksComponent } from './Tasks/view-tasks/view-tasks.component';
import { HealthService } from 'src/services/health.service';
import { ListUserComponent } from './Users/list/listuser.component';
import { ManageUserComponent } from './Users/manage/manageuser.component';
import { ListProjectsComponent } from './Projects/list-projects/list-projects.component';
import { EditProjectComponent } from './Projects/edit-project/edit-project.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTasksComponent,
    HomeComponent,
    ManageUserComponent,
    ListUserComponent,
    ListProjectsComponent,
    EditProjectComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HealthService,
    TasksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
