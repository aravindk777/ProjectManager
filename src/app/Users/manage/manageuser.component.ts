import { Component, OnInit, Inject, Optional } from '@angular/core';
import { User } from 'src/Model/Users/user.Model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageUserComponent implements OnInit {
  user: User;

  constructor(
    private dialogRef: MatDialogRef<ManageUserComponent>,
    private userSvc: UserService,
    @Optional() @Inject(MAT_DIALOG_DATA) public userToEdit?: User
    ) {
      // console.log('Incoming data is: ' + JSON.stringify(userToEdit));
      if (userToEdit === null || userToEdit === undefined) {
        this.user = new User();
      } else {
        this.user = userToEdit;
      }
   }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

  SaveUser(): void {
    if(this.user.Id === '') {
      console.log('data to save: ' + JSON.stringify(this.user));
    this.userSvc.AddUser(this.user)
    .subscribe(result => {
      if (result !== null) {
        console.log('Create Success');
        this.dialogRef.close(true);

      } else {
        console.log('Create failed.');
        this.dialogRef.close(false);
      }
    },
    err => console.log('Create Error: ' + JSON.stringify(<any>err))
    );
  } else {
    console.log('data to update: ' + JSON.stringify(this.user));
    this.userSvc.UpdateUser(this.user)
    .subscribe(result => {
      if (result !== null) {
        console.log('Update Success');
        this.dialogRef.close(true);

      } else {
        console.log('Update failed.');
        this.dialogRef.close(false);
      }
    },
    err => console.log('Update Error: ' + JSON.stringify(<any>err))
    );
  }
  }

}
