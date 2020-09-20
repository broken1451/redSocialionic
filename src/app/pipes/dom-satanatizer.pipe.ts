import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSatanatizer',
})
export class DomSatanatizerPipe implements PipeTransform {
  constructor(private domSanatizer: DomSanitizer) {}

  transform(img: string) {
    console.log({ imgPipe: img });

    const domImg = `background-image: url('${img}')`;

    console.log({ domImg });

    return this.domSanatizer.bypassSecurityTrustStyle(domImg);
  }
}
