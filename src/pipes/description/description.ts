import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DescriptionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'description',
})
export class DescriptionPipe implements PipeTransform {

  transform(description: string) {

    return description.split('}')[1];
  }
}
