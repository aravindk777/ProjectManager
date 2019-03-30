import { Component, OnInit, Inject, Optional } from '@angular/core';
import { User } from 'src/Model/Users/user.Model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageUserComponent implements OnInit {
  user: User;
  workInProgress = false;
  incomingUserId: string;

  constructor(
    private dialogRef: MatDialogRef<ManageUserComponent>,
    private userSvc: UserService,
    private matSbStatus: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public userToEdit?: User
    ) {
      // console.log('Incoming data is: ' + JSON.stringify(userToEdit));
      if (userToEdit === null || userToEdit === undefined) {
        this.user = new User();
      } else {
        this.incomingUserId = userToEdit.UserId;
        this.user = userToEdit;
      }
   }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  SaveUser(): void {
    this.workInProgress = true;
    // console.log('checking User data: ' + JSON.stringify(this.user) + ' and Id is: ' + this.user.Id);
    const matSbConfig = new MatSnackBarConfig();
    matSbConfig.duration = 3000;
    matSbConfig.verticalPosition = 'bottom';

    if (this.user.Id === undefined || this.user.Id === '') {
      console.log('data to save: ' + JSON.stringify(this.user));
    this.userSvc.AddUser(this.user)
    .subscribe(result => {
      this.workInProgress = false;
      if (result !== null) {
        console.log('Create Success');
        this.matSbStatus.open(result.UserId + ' created successfully !', 'Dismiss', matSbConfig);
        this.dialogRef.close(true);

      } else {
        console.log('Create failed.');
        this.dialogRef.close(false);
      }
    },
    err => {
      this.workInProgress = false;
      this.matSbStatus.open('Error occured !', 'View Details', {verticalPosition: 'top'});
      console.log('Create Error: ' + JSON.stringify(<any>err));
    }
    );
  } else {
    console.log('data to update: ' + JSON.stringify(this.user));
    this.userSvc.UpdateUser(this.incomingUserId, this.user)
    .subscribe(result => {
      this.workInProgress = false;
      if (result !== null) {
        console.log('Update Success');
        this.matSbStatus.open(this.user.UserId + ' updated successfully !', 'Dismiss', matSbConfig);
        this.dialogRef.close(true);

      } else {
        console.log('Update failed.');
        this.dialogRef.close(false);
      }
    },
    err => {
      this.workInProgress = false;
      this.matSbStatus.open('Error occured !', 'View Details', {verticalPosition: 'top'});
      console.log('Update Error: ' + JSON.stringify(<any>err));
    }
    );
  }
  }
}
