import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ViewTasks } from 'src/Model/Tasks/view-tasks.model';
import { TasksService } from 'src/services/tasks.service';
import { environment } from 'src/environments/environment';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatSnackBar, MatTableDataSource } from '@angular/material';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from 'src/Model/Tasks/task.model';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { AlertsComponent } from 'src/app/common/alerts.component';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit, AfterViewInit {
  AllTasks: ViewTasks[];
  totalTasks: number;
  _searchKeyword: string;
  get searchKeyword(): string {return this._searchKeyword;}
  set searchKeyword(value: string) {
    if (value !== '') {
    this._searchKeyword = value;
    this.Search(value);
    } else { this.GetAllTasks(); }
  }
  displayColumns = ['TaskName', 'Parent', 'Priority', 'UserName', 'ProjectName', 'StartDate', 'EndDate', 'Options'];
  loadingInProgress = true;
  taskTableDs: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private taskApiSvc: TasksService,
    private taskAddEditDialog: MatDialog,
    private confirmationDialog: MatDialog,
    private snackBarStatus: MatSnackBar
    ) {
   }

   Search(searchTxt: string) {
    this.taskTableDs.filter = searchTxt;
   }

  ngOnInit() {
    this.GetAllTasks();
  }

  ngAfterViewInit() {
  }

  public GetAllTasks() {
    this.loadingInProgress = true;
    this.taskApiSvc.GetAllTasks()
    .subscribe(result => {
      this.AllTasks = result;
      this.taskTableDs = new MatTableDataSource(this.AllTasks);
      this.taskTableDs.sort = this.sort;
      this.taskTableDs.paginator = this.paginator;
      this.loadingInProgress = false;
      // this.paginator.length = this.totalPages;
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
