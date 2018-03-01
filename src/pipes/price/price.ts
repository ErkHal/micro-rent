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

    try {

    const listingInfo = JSON.parse(description.split('|')[0]);

    //console.log(JSON.stringify(listingInfo));

    return listingInfo.price;

  } catch(err) {
    console.log(err);
    return 'Couldnt find the price !';
  }
  }
}
