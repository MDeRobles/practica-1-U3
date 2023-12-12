import { Component } from '@angular/core';
import { Product } from '../models/product.models';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Compra } from '../models/compra.models';


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
  public productsComprados: string[] = [];
  
  public precio:number = 0;
  //public total:number = 0;

  private refreshSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private dataService: DataService,private toastController: ToastController) {}

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



  public getFav(){
    return this.dataService.FavProducts;
  }
  
  public getTotal(){
    return this.dataService.total;
  }

  public getCompras(){
    return this.productsComprados
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

  public setCompras(compra: Compra): void {
    this.dataService.productsComprados.push(compra);
    this.mostrarMensaje("Compra realizada con exito")
  }

  agregarCompra() {
    // Supongamos que tienes los datos de la compra disponibles
    const nuevaCompra: Compra = {
      id: this.dataService.productsComprados.length + 1, // Reemplaza con el ID adecuado
      fecha: "2023-10-28", // Reemplaza con la fecha adecuada
      total: this.dataService.total // Reemplaza con el total de la compra
    };

    this.setCompras(nuevaCompra);
    this.mostrarMensaje("Compra realizada con éxito");
    this.dataService.sharedProducts.splice(0,this.dataService.sharedProducts.length)
    this.dataService.sharedProducts = [];
    this.dataService.sharedProducts.length = 0;
   // this.dataService.sharedProducts.splice(this.dataService.sharedProducts.indexOf(1)
  
  }

  

  async mostrarMensaje(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      
    });
    toast.present();
  }

}