import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSatanatizerPipe } from './dom-satanatizer.pipe';



@NgModule({
  declarations: [DomSatanatizerPipe],
  imports: [
    CommonModule
  ],
  exports: [DomSatanatizerPipe]
})
export class PipesModule { }
