import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'imgPipe'
})
export class ImgPipePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){}

  transform(img: any): unknown {
    return this.domSanitizer.bypassSecurityTrustUrl(img);
  }

}
