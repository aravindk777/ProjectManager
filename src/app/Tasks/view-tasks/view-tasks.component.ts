import { Component, OnInit } from '@angular/core';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/services/tasks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  AllTasks: ViewTasks[];
  totalTasks: number;
  pageIndex = 1;
  pageSize: number = environment.PageSize;
  pages: number;

  // filter vars
  _taskNameFilter: string;
  get taskNameFilter(): string { return this._taskNameFilter; }
  set taskNameFilter(value: string) {
    this._taskNameFilter = value;
    // this.AllTasks = value ? this.AllTasks.filter(tasks => tasks.TaskName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1)
    // : this.AllTasks;
    // this.GetAllTasks(0, 0);
    // console.log('All Tasks count with filter: ' + this.AllTasks.length);
  }

  _parentTaskFilter: string;
  get parentTaskFilter(): string { return this._parentTaskFilter; }
  set parentTaskFilter(value: string) {
    this._parentTaskFilter = value;
    // this.AllTasks = value ? this.AllTasks.filter(tasks => tasks.TaskName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1)
    // : this.AllTasks;
    // this.GetAllTasks(0, 0);
    // console.log('All Tasks count with filter: ' + this.AllTasks.length);
  }

  _prFromFilter: number;
  get PrFromFilter(): number { return this._prFromFilter; }
  set PrFromFilter(value: number) {
    this._prFromFilter = value;
    // this.AllTasks = value ? this.AllTasks.filter(tasks => tasks.TaskName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1)
    // : this.AllTasks;
    // this.GetAllTasks(0, 0);
    // console.log('All Tasks count with filter: ' + this.AllTasks.length);
  }

  _prToFilter: number;
  get PrToFilter(): number { return this._prToFilter; }
  set PrToFilter(value: number) {
    this._prToFilter = value;
    // this.AllTasks = value ? this.AllTasks.filter(tasks => tasks.TaskName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1)
    // : this.AllTasks;
    // this.GetAllTasks(0, 0);
    // console.log('All Tasks count with filter: ' + this.AllTasks.length);
  }

  _startFilter: Date;
  get startFilter(): Date { return this._startFilter; }
  set startFilter(value: Date) {
    this._startFilter = value;
    // this.AllTasks = value ? this.AllTasks.filter(tasks => tasks.TaskName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1)
    // : this.AllTasks;
    // this.GetAllTasks(0, 0);
    // console.log('All Tasks count with filter: ' + this.AllTasks.length);
  }

  _endFilter: Date;
  get endFilter(): Date { return this._endFilter; }
  set endFilter(value: Date) {
    this._endFilter = value;
    // this.AllTasks = value ? this.AllTasks.filter(tasks => tasks.TaskName.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1)
    // : this.AllTasks;
    // this.GetAllTasks(0, 0);
    // console.log('All Tasks count with filter: ' + this.AllTasks.length);
  }

  constructor(
    private _route: Router,
    private _taskApiSvc: TasksService,
    private activatedRoute: ActivatedRoute
    ) {
    this.AllTasks = [];
    // console.log('view task constructor called');
    // this.taskNameFilter = 'Test';
   }

   Search() {
     this.GetAllTasks(0, 0, this.taskNameFilter, this.parentTaskFilter,
      this.PrFromFilter, this.PrToFilter, this.startFilter, this.endFilter);
     console.log('All Tasks count with filter: ' + this.AllTasks.length);

     // reset to 1st page as index to ensure the search filter is used
     this.pageIndex = 1;
     this.EvaluatePagination(this.AllTasks.length);
   }

   EvaluatePagination(totalRecords: number) {
     this.pages = Math.ceil(totalRecords / this.pageSize);
     console.log('pages available to view: ' + this.pages);
   }

  ngOnInit() {
    // Get page size
    this._taskApiSvc.GetTasksCount()
    .subscribe(result => {
      this.totalTasks = result;
      console.log('Total records: ' + this.totalTasks);
      this.EvaluatePagination(this.totalTasks);
    });

    this.activatedRoute.params
    .subscribe(params => {
      this.pageIndex = +params['page'] || 1;
      console.log('Page index is ' + this.pageIndex + ' and PageSize: ' + this.pageSize);
      this.GetAllTasks(this.pageIndex, this.pageSize);
    });
  }

  GetAllTasks(_pageIndex: number, _recPerPage: number,
    taskFilter = '', parentNameFilter = '', prFrom = 0, prTo = 0,
    startDtFilter: Date = null, endDtFilter: Date = null) {
      // Get all tasks with pagination
    this._taskApiSvc.GetAllTasks(_pageIndex, _recPerPage, taskFilter, parentNameFilter, prFrom, prTo, startDtFilter, endDtFilter)
    .subscribe(
      tasks => {
        this.AllTasks = tasks;
        this.AllTasks
        .forEach(task => {
          const today = new Date();
          if (task.EndDate === null || new Date(task.EndDate) >= today) { task.Active = true; } else { task.Active = false; }
          return task;
        });
      },
      error => console.log('Error: ' + error)
    );
  }

  EditTask(TaskId: number): void {
    // alert('You are about to edit the Task with the ID: ' + TaskId);
    this._route.navigate(['/AddTask'], {queryParams: {id: TaskId}});
  }

  EndTask(TaskId: number, skipConfirmation = false): boolean {
    const confirmation = !skipConfirmation ? confirm('Are you sure ?') : skipConfirmation;
    if (confirmation) {
      this._taskApiSvc.EndTask(TaskId)
      .subscribe(res => {
        if (res) {
          // window.location.reload();
          this.GetAllTasks(this.pageIndex, this.pageSize);
        } else { alert('Could not end the task. Please try again later!'); }
      }, err => console.log('Error occured: ' + <any> err));
    }
    return confirmation;
  }

}
