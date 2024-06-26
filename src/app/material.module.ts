import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [MatDialogModule, MatStepperModule, MatInputModule, MatButtonModule],
})
export class MaterialModule {}
