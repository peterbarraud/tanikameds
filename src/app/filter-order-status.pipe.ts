import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrderStatus'
})
export class FilterOrderStatusPipe implements PipeTransform {

  transform(items: any[], filter:Number): any {
    let retval = [];
    if (items){
      items.forEach(function(item){
        if (item.id !== filter){
          retval.push(item);
        }
      })

    }
    return retval;
  }

}
