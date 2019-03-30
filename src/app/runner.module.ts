import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

/* Angular Material components and modules */
import {MatCardModule } from '@angular/material/card';
import {
  MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatTableModule,
  MatInputModule, MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatSlideToggleModule, MatProgressBarModule, MatSelectModule, MatSliderModule, MatFormFieldModule,
  MatPaginatorModule
} from '@angular/material';

import { MatExpansionModule} from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatSidenavModule,
    MatToolbarModule, MatIconModule, MatListModule, MatInputModule, MatFormFieldModule,
    MatCheckboxModule, MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule,
    FlexLayoutModule, MatSliderModule, MatExpansionModule, MatPaginatorModule,
    MatSlideToggleModule, MatProgressBarModule, MatRadioModule, MatSelectModule, NgxSpinnerModule
  ],
  exports: [
    CommonModule, MatCardModule, MatTableModule, MatButtonModule,
    MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule,
    MatInputModule, MatFormFieldModule, MatCheckboxModule, MatDialogModule,
    MatProgressSpinnerModule, MatSnackBarModule, FlexLayoutModule, MatSliderModule, MatPaginatorModule,
    MatSlideToggleModule, MatProgressBarModule, MatRadioModule, MatSelectModule, MatExpansionModule, NgxSpinnerModule
  ]
})
export class RunnerModule { }
