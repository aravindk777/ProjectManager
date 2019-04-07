// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AlertsComponent } from './alerts.component';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
// import { AlertInfo } from 'src/Model/common/alert-info.model';
// import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

// describe('AlertsComponent', () => {
//   let component: AlertsComponent;
//   let fixture: ComponentFixture<AlertsComponent>;
//   let mockDialogRef: MatDialogRef<AlertsComponent>;
//   let mockAlertInfoObj: AlertInfo;
//   // const MY_MAT_MOCK_TOKEN = new InjectionToken<AlertInfo>('Mock Injection Token', {
//   //   providedIn: 'root',
//   //   factory: () => new AlertInfo()
//   // });

//   // @Component({
//   //   selector: 'app-alerts',
//   //   template: '<div><mat-dialog-content></mat-dialog-content></div>'
//   // })

//   class MockAlertsComponent { }

//   mockDialogRef = TestBed.get(MatDialogRef);
//   mockAlertInfoObj = new AlertInfo();
//   mockAlertInfoObj.ConfirmPopup = false;
//   mockAlertInfoObj.Body = 'test alert';

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ AlertsComponent, MockAlertsComponent ],
//       imports: [MatDialogModule],
//       providers: [
//         {provide: MatDialogRef, useValue: mockDialogRef},
//         {provide: MAT_DIALOG_DATA, useValue: mockAlertInfoObj},
//       ],
//       schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
//     })
//     .compileComponents();
//   }));

//   // TestBed.overrideModule(BrowserDynamicTestingModule, {
//   //   set: {
//   //     entryComponents: [AlertsComponent]
//   //   }
//   // });

//   // beforeEach(() => {
//   //   fixture = TestBed.createComponent(AlertsComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   // xit('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
// });
