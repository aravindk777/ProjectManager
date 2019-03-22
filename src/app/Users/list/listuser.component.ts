import { Component, OnInit } from '@angular/core';
import { User } from 'src/Model/Users/user.Model';
import { UserService } from 'src/services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageUserComponent } from '../manage/manageuser.component';
import { AlertsComponent } from 'src/app/common/alerts.component';
import { AlertInfo } from 'src/Model/common/alert-info.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListUserComponent implements OnInit {

  AllUsers: User[];
  alertData: AlertInfo;
  loadingInProgress = true;
  _activeOnly = false;
get activeOnly(): boolean {return this._activeOnly;}
set activeOnly(value: boolean) {
  this._activeOnly = value;
  this.GetAllUsers(value);
}

  sortParam = '';

  _searchKeyword: string;
  get searchKeyword(): string {return this._searchKeyword; }
  set searchKeyword(value: string) {
    if (value !== '') {
    this._searchKeyword = value;
    this.Search(value);
    } else { this.GetAllUsers(this.activeOnly); }
  }

  constructor(
    private userApi: UserService,
    private useraddeditDialog: MatDialog,
    private alertDialog: MatDialog,
    private notificationBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.GetAllUsers(false);
  }

  GetAllUsers(active: boolean): void {
    this.loadingInProgress = true;

    console.log('Get all users is invoked to show activeonly ?' + this.activeOnly);
    if (active) {
      this.userApi.GetActiveUsers()
    .subscribe(
      users => {
        this.AllUsers = users;
        if (this.AllUsers === undefined || this.AllUsers.length === 0) {
        // do nothing for now.
        }
      this.loadingInProgress = false;
      },
      err => {
        console.log('err: ' + err + '\ntype is: ' + typeof err);
        this.loadingInProgress = false;
        this.notificationBar.open('Error while trying to load data - ' + err, 'Dismiss', {duration: 5000});
      }
    );
    } else {
    this.userApi.GetUsers()
    .subscribe(users => {this.AllUsers = users;
      if (this.AllUsers === undefined || this.AllUsers.length === 0) {
        // do nothing for now.
        // console.log('no data yielded from DB');
      } else {
        // console.log('Users available: ', this.AllUsers.length);
      }
      this.loadingInProgress = false;
    },
    err => {
      this.loadingInProgress = false;
      this.notificationBar.open('Error while trying to load data - ' + err.statusText + '\n' + err.message, 'Dismiss',
      this.GetNotificationSettings());
    });
    // console.log('what is AllUsers now? ', this.AllUsers);
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

  GetNotificationSettings(): MatSnackBarConfig {
    const notificationSettings = new MatSnackBarConfig();
    notificationSettings.panelClass = 'snackBarNotifications';
    notificationSettings.duration = 5000;
    notificationSettings.politeness = 'assertive';
    notificationSettings.horizontalPosition= 'center';
    notificationSettings.verticalPosition = 'top';
    return notificationSettings;
  }

  public AddUser() {
    const diagRef = this.useraddeditDialog.open(ManageUserComponent, this.DialogSettings());
    diagRef.afterClosed().subscribe(data => {
      console.log('status after closure: ' + data);
      if (<boolean>data) {
        this.GetAllUsers(this.activeOnly);
      }
    });
  }

  public EditUser(userToEdit: User) {
    console.log('You selected ${userToEdit.UserId} to edit');
    const diagRef = this.useraddeditDialog.open(ManageUserComponent, this.DialogSettings(userToEdit));
    diagRef.afterClosed().subscribe(data => {
      console.log('status after closure: ' + data);
      if (<boolean>data) {
        this.GetAllUsers(this.activeOnly);
      }
    });
  }

  public RemoveUser(userId: string) {
    this.alertData = new AlertInfo();
    this.alertData.ConfirmPopup = true;
    this.alertData.Body = 'Are you sure to remove this user [' + userId + '] ?';
    const diagRef = this.alertDialog.open(AlertsComponent, this.DialogSettings(this.alertData, typeof this.alertData));
    diagRef.afterClosed().subscribe(resp => {
      if (<Boolean> resp) {
        this.userApi.RemoveUser(userId).subscribe(result => {
          if (result) {
            this.GetAllUsers(this.activeOnly);
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
