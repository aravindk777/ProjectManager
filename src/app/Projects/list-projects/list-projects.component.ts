import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/Model/Projects/projects.model';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { ProjectService } from 'src/services/project.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { AlertsComponent } from 'src/app/common/alerts.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {

  AllProjects: Projects[];
  alertData: AlertInfo;
  loadingInProgress = true;
  constructor(
    private projectApi: ProjectService,
    private projAddEditDialog: MatDialog,
    private alertDialog: MatDialog,
    private snackBarStatus: MatSnackBar
  ) { }

  ngOnInit() {
    this.GetProjects();
  }

  DialogSettings(data?: Projects | AlertInfo, dialogFor?: string): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // if (<AlertInfo> diagType) {
    dialogConfig.minWidth = '500px';
    dialogConfig.width = 'auto';
    dialogConfig.minHeight = '300px';
    dialogConfig.height = 'auto';
    // } else { dialogConfig.width = '50pc'; }
    dialogConfig.id = dialogFor;
    dialogConfig.data = data;
    console.log('dialog data is ' + JSON.stringify(data));
    return dialogConfig;
  }

  public AddNew() {
    const diagRef = this.projAddEditDialog.open(EditProjectComponent, this.DialogSettings());
    diagRef.afterClosed().subscribe(data => {
      console.log('status after closure: ' + data);
      if (<boolean>data) {
        this.GetProjects();
      }
      // if (<Projects> data) {
      //   this.AllProjects.push(data);
      // }
    });
  }

  public EditProject(projectToEdit: Projects) {
    const editDiagRef = this.projAddEditDialog.open(EditProjectComponent,
                        this.DialogSettings(projectToEdit, 'EditProject' + projectToEdit.ProjectId));
    editDiagRef.afterClosed().subscribe(result => {
      if (<boolean> result) {
        this.GetProjects();
      }
    });
  }

  public GetProjects() {
    this.loadingInProgress = true;
    this.projectApi.GetAll()
    .subscribe(result => {
      this.loadingInProgress = false;
      this.AllProjects = result;
    });
  }

  public GetProjectById(projId: number): Projects {
    let projectToEdit: Projects;
    this.projectApi.Get(projId)
            .subscribe(result => {
              this.loadingInProgress = false;
              projectToEdit = result;
            });
    return projectToEdit;
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
            this.GetProjects();
          }});
      }
    });

  }
}
