import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if (!args) return value;
    return value.filter(items => {
    return (
    items.description.includes(args) == true || items.tittle.includes(args) == true
    );
    });
    }
}
