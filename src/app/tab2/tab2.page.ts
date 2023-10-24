import { Component } from '@angular/core';
import { Product } from '../models/product.models';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public typeProduct = "";
  public statusType = false;
  public products: Product[] = [];
  public productsFounds: Product[]=[];
  
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


  public getProductos(){
    return this.dataService.uniqueProducts;
  }
  
  public getTotal(){
    return this.dataService.total;
  }

  public deleteProducttoCart(producto:Product):void{
    producto.quantity--;
    this.dataService.sharedProducts.splice(this.dataService.sharedProducts.indexOf(producto),1)
    if(this.countProducttoCart(producto)==0){
      this.dataService.uniqueProducts.delete(producto);
    }
    this.dataService.total-=producto.price;
  }

  public countProducttoCart(producto:Product):number{
    return this.dataService.sharedProducts.filter(p=> p===producto).length;
  }

  refreshPage() {
    // Coloca aquí la lógica de actualización que necesitas

    // Luego, puedes recargar la página actual utilizando el objeto location
    location.reload();
  }

}