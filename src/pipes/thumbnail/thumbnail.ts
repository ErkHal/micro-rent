import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  transform(filename: string, args?: string): string {

    const imageSizes = {
      small: "-tn160.png",
      medium: "-tn320.png",
      large: "-tn640.png"
    };

    if(args) {
      return filename.split('.')[0] + imageSizes[args];
    }

    return filename.split('.')[0] + imageSizes.small;
  }
}
