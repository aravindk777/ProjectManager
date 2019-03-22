import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Projects } from 'src/Model/Projects/projects.model';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig } from '@angular/material';
import { ProjectService } from 'src/services/project.service';
import { UserService } from 'src/services/user.service';
import { User } from 'src/Model/Users/user.Model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projectToSave: Projects;
  activeUsers: User[];
  workInProgress = false;

  constructor(
    private dialogRef: MatDialogRef<EditProjectComponent>,
    private matSbStatus: MatSnackBar,
    private projSvc: ProjectService,
    private userSvc: UserService,
    @Optional() @Inject(MAT_DIALOG_DATA) public projectToEdit?: Projects
  ) {
    this.GetActiveUsersList();
    if (projectToEdit === null || projectToEdit === undefined) {
      this.projectToSave = new Projects();
    } else {
      console.log(JSON.stringify(projectToEdit));
      this.projectToSave = projectToEdit;
    }
  }

  ngOnInit() {
  }

  GetSnackbarConfiguration(politeness: boolean): MatSnackBarConfig {
    const matSbConfig = new MatSnackBarConfig();
    // matSbConfig.data = message;
    matSbConfig.duration = 3000;
    matSbConfig.politeness = politeness ? 'polite' : 'assertive';
    matSbConfig.verticalPosition = 'bottom';
    return matSbConfig;
  }

  Save() {
    this.workInProgress = true;
    // new project
    if (this.projectToSave.ProjectId === undefined || this.projectToSave.ProjectId === 0) {
      this.projSvc.Add(this.projectToSave)
      .subscribe(result => {
        if (result !== null && result.ProjectId !== 0) {
          this.workInProgress = false;
          this.matSbStatus.open('Created successfully !', 'Dismiss', this.GetSnackbarConfiguration(true));
          this.dialogRef.close(true);
        } else {
          this.workInProgress = false;
          this.matSbStatus.open('Could not save. Please retry', 'Dismiss', this.GetSnackbarConfiguration(false));
        }
      },
      err => {
        this.workInProgress = false;
        this.matSbStatus.open('Error occured. Please check the information and retry', 'Dismiss', this.GetSnackbarConfiguration(false));
      });
    } else {
      this.projSvc.Update(this.projectToSave)
      .subscribe(result => {
        if (result !== null && result) {
          this.workInProgress = false;
          this.matSbStatus.open('Updated successfully !', 'Dismiss', this.GetSnackbarConfiguration(true));
          this.dialogRef.close(result);
      } else {
        this.workInProgress = false;
        this.matSbStatus.open('Could not update. Please retry', 'Dismiss', this.GetSnackbarConfiguration(false));
      }
    },
    err => {
      this.workInProgress = false;
      this.matSbStatus.open('Error occured. Please check the information and retry', 'Dismiss', this.GetSnackbarConfiguration(false));
    });
  }
  }

  GetActiveUsersList(): void {
    console.log('Going to get all active users');
    this.userSvc.GetActiveUsers()
    .subscribe(data => {
      this.activeUsers = data;
      console.log('Active users fetched: ' + this.activeUsers.length);
    });
  }

  cancelDialog() {
    this.dialogRef.close(false);
  }

}
