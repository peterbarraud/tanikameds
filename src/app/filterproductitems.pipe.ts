import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterproductitems',
  pure: false /** false because we want a dynamic pipe **/
})
export class FilterProductItemsPipe implements PipeTransform {

  transform(productitems: string[], selectedItems: string[]): string[] {
    return productitems.filter(function(a) { return selectedItems.indexOf(a) < 0 })
  }

}