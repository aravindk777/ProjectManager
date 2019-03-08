import { Component, OnInit } from '@angular/core';
import { User } from 'src/Model/Users/user.Model';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageUserComponent } from '../manage/manageuser.component';
import { Observable } from 'rxjs';
import { AlertsComponent } from 'src/app/common/alerts.component';
import { AlertInfo } from 'src/Model/common/alert-info.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListUserComponent implements OnInit {

  AllUsers: User[];
  alertData: AlertInfo;
  loadingInProgress = true;
  activeOnly = false;
  sortParam = '';

  _searchKeyword: string;
  get searchKeyword(): string {return this._searchKeyword; }
  set searchKeyword(value: string) {
    if (value !== '') {
    this._searchKeyword = value;
    this.Search(value);
    } else { this.GetAllUsers(); }
  }

  constructor(
    private route: Router,
    private userApi: UserService,
    private activatedRoute: ActivatedRoute,
    private useraddeditDialog: MatDialog,
    private alertDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.GetAllUsers();
  }

  GetAllUsers(): void {
    this.loadingInProgress = true;
    console.log('Get all users is invoked to show activeonly ?' + this.activeOnly);
    if(this.activeOnly) {
      this.userApi.GetActiveUsers()
    .subscribe(users => {this.AllUsers = users;
      if (this.AllUsers === undefined || this.AllUsers.length === 0) {
        // do nothing for now.
      }
      this.loadingInProgress = false;
    });
    } else {
    this.userApi.GetUsers()
    .subscribe(users => {this.AllUsers = users;
      if (this.AllUsers === undefined || this.AllUsers.length === 0) {
        // do nothing for now.
      }
      this.loadingInProgress = false;
    });
  }
  }

  DialogSettings(data?: any, diagType?: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    // if (<AlertInfo> diagType) {
      dialogConfig.width = 'auto';
    // } else { dialogConfig.width = '50pc'; }
    dialogConfig.id = 'addUserDiag';
    dialogConfig.data = data;
    console.log('dialog data is ' + JSON.stringify(data));
    return dialogConfig;
  }

  public AddUser() {
    const diagRef = this.useraddeditDialog.open(ManageUserComponent, this.DialogSettings());
    diagRef.afterClosed().subscribe(data => {
      console.log('status after closure: ' + data);
      if(<boolean>data) {
        this.GetAllUsers();
      }
    });
  }

  public EditUser(userToEdit: User) {
    console.log('You selected ${userToEdit.UserId} to edit');
    const diagRef = this.useraddeditDialog.open(ManageUserComponent, this.DialogSettings(userToEdit));
    diagRef.afterClosed().subscribe(data => {
      console.log('status after closure: ' + data);
      if(<boolean>data) {
        this.GetAllUsers();
      }
    });
  }

  public RemoveUser(userId: string) {
    this.alertData = new AlertInfo();
    this.alertData.ConfirmPopup = true;
    this.alertData.Body = 'Are you sure to remove this user [' + userId + '] ?';
    const diagRef = this.alertDialog.open(AlertsComponent, this.DialogSettings(this.alertData, typeof this.alertData));
    diagRef.afterClosed().subscribe(resp => {
      if(<Boolean> resp) {
        this.userApi.RemoveUser(userId).subscribe(result => {
          if(result) {
            this.GetAllUsers();
          }});
      }
    });
  }

  public Search(keyword: string) {
    this.loadingInProgress = true;
    this.userApi.SearchUser(this._searchKeyword || keyword)
    .subscribe(users => {
      this.AllUsers = users;
      if (this.AllUsers === undefined || this.AllUsers.length === 0) {
        // do nothing for now.
      }
      this.loadingInProgress = false;
    });
  }

  public Sort() {
    // console.log('Selected value: ' + this.sortParam);
    if (this.sortParam === 'FirstName') {
    this.AllUsers.sort(function(a, b) {
        if (a.FirstName.toUpperCase() > b.FirstName.toUpperCase()) { return 1; } else
        if (a.FirstName.toUpperCase() < b.FirstName.toUpperCase()) {return -1; }
        return 0;
      });
    }

    if (this.sortParam === 'LastName') {
      this.AllUsers.sort(function(a, b) {
        if (a.LastName.toUpperCase() > b.LastName.toUpperCase()) { return 1; } else
        if (a.LastName.toUpperCase() < b.LastName.toUpperCase()) {return -1; }
        return 0;
      });
    }

    if (this.sortParam === 'UserId') {
      this.AllUsers.sort(function(a, b) {
        if (a.UserId.toUpperCase() > b.UserId.toUpperCase()) { return 1; } else
        if (a.UserId.toUpperCase() < b.UserId.toUpperCase()) {return -1; }
        return 0;
      });
    }
    // console.log(this.AllUsers);
  }
}
