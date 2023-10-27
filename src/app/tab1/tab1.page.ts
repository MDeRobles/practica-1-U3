import { Component } from '@angular/core';
import { Product } from '../models/product.models';
import { DataService } from '../data.service';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products: Product[]=[];
  public productsFounds: Product[]=[]

  public filter=[
    "Abarrotes",
    "Frutas y Verduras",
    "Limpieza",
    "Farmacia"
  ];


  public productsCar: Product[]=[];

  public productsFav: Product[]=[];


  total: number = 0; // Propiedad para almacenar el total


  constructor(private dataService: DataService, private toastController: ToastController) {

    
    //Abarrotes
    this.products.push({
      id: 1,
      name: "Coca Cola",
      price: 20,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Abarrotes" ,
      description: "Sabor Cola", 
      color:"tertiary",
      quantity: 5
    });
    this.products.push({
      id: 2,
      name: "Galletas Oreo",
      price: 17,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Abarrotes" ,
      description: "Sabor Chocolate", 
      color:"tertiary",
      quantity: 5
    });
    this.products.push({
      id: 3,
      name: "Takis Fuego Azul",
      price: 20,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Abarrotes" ,
      description: "Sabor Chile", 
      color:"tertiary",
      quantity: 5
    });
    //Limpieza
    this.products.push({
      id: 4,
      name: "Pinol",
      price: 18,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Limpieza",  
      description: "Limpiador para pisos",
      color:"warning",
      quantity: 5
    });
    this.products.push({
      id: 5,
      name: "Cloro",
      price: 23,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Limpieza",  
      description: "Limpia el 99% de las vacterias",
      color:"warning",
      quantity: 5
    });
    this.products.push({
      id: 6,
      name: "Pastilla para baño",
      price: 18,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Limpieza",  
      description: "Aroma a rosas",
      color:"warning",
      quantity: 5
    });
    //Frutas y Verduras
    this.products.push({
      id: 7,
      name: "Ahuacate Hash",
      price: 8,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Frutas y Verduras",      
      description: "Muy rico",
      color:"secondary",
      quantity: 5
    });
    this.products.push({
      id: 8,
      name: "Pepino",
      price: 8,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Frutas y Verduras",      
      description: "Ps ta chido",
      color:"secondary",
      quantity: 5
    });
    this.products.push({
      id: 9,
      name: "Limón",
      price: 8,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Frutas y Verduras",      
      description: "Chido y jugoso",
      color:"secondary",
      quantity: 5
    });
    //Farmacia
    this.products.push({
      id: 10,
      name: "Paracetamol",
      price: 20,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Farmacia",  
      description: "Te alivias porque te alivias",
      color:"danger",
      quantity: 5 
    });
    this.products.push({
      id: 11,
      name: "Alcohol 96%",
      price: 20,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Farmacia",  
      description: "OJO no se toma",
      color:"danger",
      quantity: 5  
    });
    this.products.push({
      id: 12,
      name: "Agua Oxigenada",
      price: 20,
      photo: "https://picsum.photos/700/300?randmom=",
      type: "Farmacia",  
      description: "Como agua pero oxigenada",
      color:"danger",
      quantity: 5    
    });

    this.productsFounds=this.products;

    

    this.calculateTotal();

  }

  public filterProducts():void{
    console.log(this.filter);
    this.productsFounds=this.products.filter(
      item => {
        return this.filter.includes(item.type);
      }
    );
  }

  public setCar(product: Product): void {
    const existingProduct = this.productsCar.find((p) => p.id === product.id);
    this.dataService.sharedProducts.push(product);
    this.dataService.uniqueProducts.add(product);
    this.dataService.total+=product.price;
  
    if (existingProduct) {
      // El producto ya existe en el carrito, aumenta la cantidad
      existingProduct.quantity++;
      this.mostrarMensaje("Producto agegado al carrito")
    } else {
      // El producto no está en el carrito, agrégalo con cantidad 1
      product.quantity = 1;
      this.productsCar.push(product);
      this.mostrarMensaje("Producto agregado al carrito")
    }
    this.calculateTotal();
  }

  public setFav(product: Product): void {
    this.dataService.FavProducts.push(product);
    this.mostrarMensaje("Producto agregado a favoritos")
  }
  


  calculateTotal() {
    return this.total = this.productsCar.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  getProductsCarData(): Product[] {
    return this.productsCar;
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
