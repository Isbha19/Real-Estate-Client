import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  exports: [MatDialogModule, MatStepperModule, MatInputModule, MatButtonModule,MatSelectModule, MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,MatButtonToggleModule
  ],
})
export class MaterialModule {}
