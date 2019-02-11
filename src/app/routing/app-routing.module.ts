import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddTaskComponent } from '../Tasks/add-task/add-task.component';
import { ViewTasksComponent } from '../Tasks/view-tasks/view-tasks.component';
import { ListUserComponent } from '../Users/list/listuser.component';
import { ListProjectsComponent } from '../Projects/list-projects/list-projects.component';

const routes: Routes = [
  {path: 'AddTask', component: AddTaskComponent},
  {path: 'ViewTask', component: ViewTasksComponent},
  {path: 'ViewTask/:page', component: ViewTasksComponent},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: ListUserComponent},
  {path: 'Projects', component: ListProjectsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
