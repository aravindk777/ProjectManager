import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

/* Angular Material components and modules */
import {MatCardModule } from '@angular/material/card';
import {
  MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatTableModule,
  MatInputModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatSlideToggleModule, MatProgressBarModule
} from '@angular/material';

import { MatRadioModule } from '@angular/material/radio';




@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatSlideToggleModule, MatProgressBarModule, MatRadioModule
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatSlideToggleModule, MatProgressBarModule, MatRadioModule
  ]
})
export class RunnerModule { }
