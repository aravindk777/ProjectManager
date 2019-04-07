import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/Model/Projects/projects.model';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { ProjectService } from 'src/services/project.service';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
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
  addNewTitleForSearch = ' ';

  _searchKeyword: string;
  get searchKeyword(): string {return this._searchKeyword; }
  set searchKeyword(value: string) {
    if (value !== '') {
      this._searchKeyword = value;
      this.Search(value);
    } else { this.GetProjects(); }
  }

  constructor(
    private projectApi: ProjectService,
    private projAddEditDialog: MatDialog  ) { }

  ngOnInit() {
    this.GetProjects();
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

  public AddNew() {
    let emptyProject: Projects;
    if (this.searchKeyword !== null && this.searchKeyword !== '') {
      emptyProject = new Projects();
      emptyProject.ProjectName = this.searchKeyword;
    }
    const diagRef = this.projAddEditDialog.open(EditProjectComponent, this.DialogSettings(emptyProject));
    diagRef.afterClosed().subscribe(data => {
      if (<boolean>data) {
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

  // public GetProjectById(projId: number): Projects {
  //   let projectToEdit: Projects;
  //   this.projectApi.Get(projId)
  //           .subscribe(result => {
  //             this.loadingInProgress = false;
  //             projectToEdit = result;
  //           });
  //   return projectToEdit;
  // }

  public Search(keyword: string) {
    this.loadingInProgress = true;
    this.projectApi.Search(keyword)
    .subscribe(results => {
      this.AllProjects = results;
      if (this.AllProjects === undefined || this.AllProjects.length === 0) {
        // do nothing for now.
        this.addNewTitleForSearch = 'Could not find what you are looking for?';
      } else { this.addNewTitleForSearch = ' '; }
      this.loadingInProgress = false;
    });
  }
}
