import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, 
        MatToolbarModule, 
        MatMenuModule, 
        MatCardModule, 
        MatInputModule, 
        MatSnackBarModule,
        MatTableModule
      } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  declarations: [

  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
  ]
})
export class MaterialModule { }
