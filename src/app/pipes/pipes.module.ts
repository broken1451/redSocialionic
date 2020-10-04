import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSatanatizerPipe } from './dom-satanatizer.pipe';
import { ImgPipePipe } from './img-pipe.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [DomSatanatizerPipe, ImgPipePipe, ImagenPipe],
  imports: [
    CommonModule
  ],
  exports: [DomSatanatizerPipe, ImgPipePipe, ImagenPipe]
})
export class PipesModule { }
