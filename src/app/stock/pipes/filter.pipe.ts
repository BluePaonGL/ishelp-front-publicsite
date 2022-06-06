import { OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(productList: any[], search: string): any[] {
    console.log(productList,search);
    if(productList && search){
      return productList.filter((d)=> d.name.indexOf(search) > -1)
    }
    return productList;
  }
  

}
