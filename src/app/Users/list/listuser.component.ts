import { Component, OnInit } from '@angular/core';
import { User } from 'src/Model/Users/user.Model';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageUserComponent } from '../manage/manageuser.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListUserComponent implements OnInit {

  AllUsers: User[];

  constructor(
    private route: Router,
    private userApi: UserService,
    private activatedRoute: ActivatedRoute,
    private useraddeditDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.GetAllUsers();
  }

  GetAllUsers(): void {
    console.log('Get all users is invoked');
    this.userApi.GetUsers()
    .subscribe(users => {this.AllUsers = users;
      if (this.AllUsers === undefined || this.AllUsers.length === 0) {
      //   this.AllUsers = [
      //     { FirstName: 'Test First', LastName: 'Test Last', UserId: 'TestUser1',
      //   Active: true, FullName: 'Test FullName', Id: '3434343'},
      //   { FirstName: 'First Two', LastName: 'Last Two', UserId: 'TestUser2',
      //   Active: false, FullName: 'FullName Two', Id: '3434343'}
      // ];
      }
    });
  }

  DialogSettings(data?: User): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '50pc';
    dialogConfig.id = 'addUserDiag';
    dialogConfig.data = data;
    console.log('dialog data is ' + data);
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
}
