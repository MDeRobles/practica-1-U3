import { Injectable } from '@angular/core';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public sharedProducts:Product[]=[];
  public uniqueProducts:Set<Product> = new Set();
  public total:number = 0;


  constructor() {

  }
}
