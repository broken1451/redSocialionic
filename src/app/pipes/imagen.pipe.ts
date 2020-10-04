import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, userId: string): string {
    // /imagen/5f655c22c213d3576aa90785/cdrckotkf929jxl.png
    return `${URL}/posts/${userId}/${img}`;
  }

}
