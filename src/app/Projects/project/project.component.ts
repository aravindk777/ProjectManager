import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Projects } from 'src/Model/Projects/projects.model';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { ProjectService } from 'src/services/project.service';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { AlertsComponent } from 'src/app/common/alerts.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnChanges {
  @Input() ItemSource: Projects;
  @Input() CardSource: Projects[];
  @Input() ProjectName: string;
  alertData: AlertInfo;
  loadingInProgress = true;
  project: Projects;
  TaskCount = 0;
  CompletedTasks = 0;
  tasksInfoLoading = true;


  constructor(
    private projectApi: ProjectService,
    private projAddEditDialog: MatDialog,
    private alertDialog: MatDialog,
    private snackBarStatus: MatSnackBar
  ) { }

  ngOnInit() {
    // console.log('On INit method called');
    this.project = this.ItemSource;
    this.GetTasksForProjectAsync(this.project.ProjectId);
  }

  ngOnChanges() {
   }

  DialogSettings(data?: Projects | AlertInfo, dialogFor?: string): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '500px';
    dialogConfig.width = 'auto';
    dialogConfig.minHeight = '300px';
    dialogConfig.height = 'auto';
    dialogConfig.id = dialogFor;
    dialogConfig.data = data;
    return dialogConfig;
  }

  public EditProject(projectToEdit: Projects) {
    const editDiagRef = this.projAddEditDialog.open(EditProjectComponent,
                        this.DialogSettings(projectToEdit, 'EditProject' + projectToEdit.ProjectId));
    editDiagRef.afterClosed().subscribe(result => {
      if (<boolean> result) {
        // this.GetProjects();
      }
    });
  }

  public Delete(projId: number) {
    this.alertData = new AlertInfo();
    this.alertData.ConfirmPopup = true;
    let alertMsg = 'Project will be marked as done.\n';
    alertMsg = alertMsg.concat('Are you sure ?');
    this.alertData.Body = alertMsg;
    // console.log(alertMsg);
    const diagRef = this.alertDialog.open(AlertsComponent, this.DialogSettings(this.alertData, 'ConfirmEndProject' + projId));
    diagRef.afterClosed().subscribe(resp => {
      if (<Boolean> resp) {
        this.loadingInProgress = true;
        this.projectApi.Delete(projId).subscribe(result => {
          this.loadingInProgress = false;
          this.snackBarStatus.open('Project ended!', 'Dismiss', {duration: 3000});
          if (result) {
            // this.GetProjects();
          }});
      }
    });

  }

  public async GetTasksForProjectAsync(projectId: number) {
    this.tasksInfoLoading = true;
    await this.projectApi.GetTasksForProject(projectId)
    .subscribe(data => {
      this.TaskCount = data.length;
      this.CompletedTasks = data.filter(t => !t.IsActive).length;
      this.tasksInfoLoading = false;
    });
  }
}
