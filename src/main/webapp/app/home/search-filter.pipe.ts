import { Pipe, PipeTransform } from '@angular/core';
import { IEmploye } from '../entities/employe/employe.model';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: IEmploye[], filterText: string): any {
    return list.filter(item => item.nom!.search(new RegExp(filterText, 'i')) > -1);
  }
}
