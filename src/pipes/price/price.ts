import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PricePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {

  transform(description: string) {

    //Splits the second match in the reqexpArray so it return only the price
    return description.match('\{(.*?)\}')[0].split(':"')[1].split('"}')[0];
  }
}
