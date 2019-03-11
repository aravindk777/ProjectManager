import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/Model/Projects/projects.model';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { ProjectService } from 'src/services/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditProjectComponent } from '../edit-project/edit-project.component';

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
    private alertDialog: MatDialog
  ) { }

  ngOnInit() {
    this.GetProjects();
  }

  DialogSettings(data?: any, dialogFor?: string): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // if (<AlertInfo> diagType) {
    dialogConfig.minWidth = '500px';
    dialogConfig.width = 'auto';
    dialogConfig.minHeight = '600px';
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

  public GetProjects() {
    this.loadingInProgress = true;
    this.projectApi.GetAll()
    .subscribe(result => {
      this.loadingInProgress = false;
      this.AllProjects = result;
    });
  }
}
