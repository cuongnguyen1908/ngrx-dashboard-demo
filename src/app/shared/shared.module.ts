import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    CommonModule
  ]
})
export class SharedModule {

}
