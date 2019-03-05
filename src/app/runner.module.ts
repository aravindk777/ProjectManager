import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/* Angular Material components and modules */
import {MatCardModule } from '@angular/material/card';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule
  ]
})
export class RunnerModule { }
