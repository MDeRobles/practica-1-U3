import { Injectable } from '@angular/core';
import { Product } from './models/product.models';
import { Compra } from './models/compra.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public sharedProducts:Product[]=[];
  public FavProducts:Product[]=[];
  public productsComprados: Compra[] = [];
  public uniqueProducts:Set<Product> = new Set();
  public uniqueProductsFav:Set<Product> = new Set();
  public ComprasProd:Set<Product> = new Set();
  public total:number = 0;


  constructor() {

  }
}