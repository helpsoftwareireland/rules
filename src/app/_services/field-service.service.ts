import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as data from '../../assets/data/fields.json';
@Injectable({
  providedIn: 'root'
})
export class FieldService {
  fields: any  = (data  as  any).default;
  // users: Array<object> = [
  //   { email: 'sarah.waters@lilly.com', code: 776887 }
  // ];
  constructor() { }
  get() {
    return of(this.fields);
  }
}
