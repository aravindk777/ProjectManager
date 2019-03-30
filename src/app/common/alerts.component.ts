import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertInfo } from 'src/Model/common/alert-info.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AlertsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public alertInfo?: AlertInfo
  ) {
    // console.log('Alert Data: ' + JSON.stringify(alertInfo));
    if (alertInfo.ConfirmPopup) {
      alertInfo.Header = 'Confirm ?';
    } else { alertInfo.Header = 'Alert'; }
    this.dialogRef.disableClose = true;
    // this.alertInfo.Body = this.alertInfo.Body.replace('\n', '<br/>');
  }

  ngOnInit() {
  }

  ConfirmResponse(response: boolean): void {
    this.dialogRef.close(response);
  }

  CloseAlert() {
    this.dialogRef.close();
  }

}
