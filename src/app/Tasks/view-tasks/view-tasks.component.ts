import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { TasksService } from 'src/services/tasks.service';
import { environment } from 'src/environments/environment';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from 'src/Model/Tasks/task.model';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsComponent } from 'src/app/common/alerts.component';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {
  AllTasks: ViewTasks[];
  totalTasks: number;
  pageSize: number = environment.PageSize;
  pages: number;
  displayColumns = ['TaskName', 'Parent', 'Priority', 'UserName', 'ProjectName', 'StartDate', 'EndDate', 'Options'];
  hoveredIndex: number;
  loadingInProgress = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private taskApiSvc: TasksService,
    private taskAddEditDialog: MatDialog,
    private confirmationDialog: MatDialog,
    private snackBarStatus: MatSnackBar
    // private pageLoadingSpinner: NgxSpinnerService
    ) {
   }

   Search() {
    //  this.GetAllTasks(0, 0, this.taskNameFilter, this.parentTaskFilter,
    //   this.PrFromFilter, this.PrToFilter, this.startFilter, this.endFilter);
   }

  ngOnInit() {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // merge(this.sort.sortChange, this.paginator.page)
    // .pipe(
    //   startWith({}),
    //   switchMap(() => {

    //   })
    // );
    // Get page size
    /*
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
    });*/
    this.loadingInProgress = true;
    this.GetAllTasks();
  }

  /*
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
  }*/

  public GetAllTasks() {
    // this.pageLoadingSpinner.show();
    this.loadingInProgress = true;
    this.taskApiSvc.GetAllTasks()
    .subscribe(result => {
      this.AllTasks = result;
      this.pages = result.length;
      this.loadingInProgress = false;
      // this.pageLoadingSpinner.hide();
    });
  }

  AddTask() {
    const diagRef = this.taskAddEditDialog.open(AddTaskComponent, this.DialogSettings());
    diagRef.afterClosed().subscribe(data => {
      console.log('status after TaskDialog closed: ' + data);
      if (<boolean>data) {
        this.GetAllTasks();
      }
    });
  }

  EditTask(editingTask: Task): void {
    const editDiagRef = this.taskAddEditDialog.open(AddTaskComponent,
                        this.DialogSettings(editingTask, 'EditTask' + editingTask.TaskId));
    editDiagRef.afterClosed().subscribe(result => {
    if (<boolean> result) {
    this.GetAllTasks();
    }
    });
  }

  EndTask(TaskId: number, skipConfirmation = false): void {
    const confirmDialogData = new AlertInfo();
    confirmDialogData.ConfirmPopup = true;
    let alertMsg = 'Task will be marked as completed.\n';
    alertMsg = alertMsg.concat('Are you sure ?');
    confirmDialogData.Body = alertMsg;

    const diagRef = this.confirmationDialog.open(AlertsComponent, this.DialogSettings(confirmDialogData, 'ConfirmEndTask' + TaskId));
    diagRef.afterClosed().subscribe(resp => {
      if (<Boolean> resp) {
        this.loadingInProgress = true;
        this.taskApiSvc.EndTask(TaskId)
        .subscribe(result => {
          this.loadingInProgress = false;
          this.snackBarStatus.open('Task completed!', 'Dismiss', {duration: 3000});
          if (result) {
            this.GetAllTasks();
          }
        },
        err => {
          this.snackBarStatus.open('Error occurred! Please retry or report the issue to application manager.', 'Ok', {duration: 3000});
        });
      }
    });
  }

  DialogSettings(data?: Task | AlertInfo, dialogFor?: string): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '500px';
    dialogConfig.width = 'auto';
    dialogConfig.minHeight = '300px';
    dialogConfig.height = 'auto';
    dialogConfig.id = dialogFor;
    dialogConfig.data = data;
    console.log('dialog data is ' + JSON.stringify(data));
    return dialogConfig;
  }

}
