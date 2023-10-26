import { Component } from '@angular/core';
import { Product } from '../models/product.models';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public typeProduct = "";
  public statusType = false;
  public products: Product[] = [];
  public productsFounds: Product[]=[];
  public productsCar: Product[]=[];
  
  public precio:number = 0;
  //public total:number = 0;

  private refreshSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private dataService: DataService) {}

  public getColor(tipo:string):string{
    switch(tipo){
      case "Abarrotes":
        return "primary";
      case "Frutas y verduras":
        return "danger";
      case "Limpieza":
        return "warning";
      case "Farmacia":
        return "medium"

    }
    return "primary"
  }


  public setCar(product: Product): void {
    const existingProduct = this.productsCar.find((p) => p.id === product.id);
    this.dataService.sharedProducts.push(product);
    this.dataService.uniqueProducts.add(product);
    this.dataService.total+=product.price;
  
    if (existingProduct) {
      // El producto ya existe en el carrito, aumenta la cantidad
      existingProduct.quantity++;
    } else {
      // El producto no está en el carrito, agrégalo con cantidad 1
      product.quantity = 1;
      this.productsCar.push(product);
    }
    
  }

  public getProductos(){
    return this.dataService.uniqueProducts;
  }

  public getFav(){
    return this.dataService.FavProducts;
  }
  
  public getTotal(){
    return this.dataService.total;
  }

  public deleteFav(producto:Product):void{
    this.dataService.FavProducts.splice(this.dataService.FavProducts.indexOf(producto),1)
    if(this.countProductFav(producto)==0){
      this.dataService.uniqueProductsFav.delete(producto);
    }
  }  

  public countProducttoCart(producto:Product):number{
    return this.dataService.sharedProducts.filter(p=> p===producto).length;
  }

  public countProductFav(producto:Product):number{
    return this.dataService.FavProducts.filter(p=> p===producto).length;
  }

  refreshPage() {
    // Coloca aquí la lógica de actualización que necesitas

    // Luego, puedes recargar la página actual utilizando el objeto location
    location.reload();
  }

}