import { Injectable } from '@angular/core';
import { Product } from './models/product.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public sharedProducts:Product[]=[];
  public FavProducts:Product[]=[];
  public productsComprados: string[] = [];
  public uniqueProducts:Set<Product> = new Set();
  public uniqueProductsFav:Set<Product> = new Set();
  public ComprasProd:Set<Product> = new Set();
  public total:number = 0;


  constructor() {

  }
}