import {ItemProduct} from '../model/item-product.model';
import {Injectable} from '@angular/core';
import {Product} from '../model/product.model';
import {AuthenticationService} from './authentication.service';
import {Caddy} from '../model/caddy.model';
import {Client} from '../model/client.model';
@Injectable({
  providedIn: 'root'
})
export  class CaddyService{
   public currentCaddyName:string="Caddy1";

   public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Caddy1'}];

   public caddies:Map<string,Caddy>=new Map();

   constructor(private authService:AuthenticationService){

     console.log(this.authService.isAuthenticated())
     if(this.authService.isAuthenticated()) {
       this.loadCaddyFromLocalStorage();
     }
     else{
       this.caddies[this.currentCaddyName]=new Caddy(this.currentCaddyName);
   }
  }

  public addProductToCaddy(id:number,name:string,price:number,quantity:number):void{
     let caddy=this.caddies[this.currentCaddyName];
     let item=caddy.items[id];
    if(item===undefined) {
      item=new ItemProduct();item.id=id;item.name=name;
      item.price=price;item.quantity=quantity;
      caddy.items[id]=item;
      this.saveCaddy()
    }

    else{
      item.quantity+=quantity;
    }
  }

  public removeProduct(id:number):void{
    let caddy=this.caddies[this.currentCaddyName];
   delete caddy.items[id];
   this.saveCaddy();
  }

  public addProduct(product:Product){

    this.addProductToCaddy(product.id,product.name,product.currentPrice,product.quantity)
    this.saveCaddy();
  }

  public loadCaddyFromLocalStorage(){

     if(this.authService.authenticatedUser){
       let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.authenticatedUser);
       this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
       this.listCaddies.forEach(c=>{
         let cad=localStorage.getItem("myCaddy_"+this.authService.authenticatedUser+"_"+c.name);
         this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
       })
     }

  }

  public getCaddy():Caddy{
    let caddy:Caddy=this.caddies[this.currentCaddyName];
    return caddy;
  }


  saveCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    localStorage.setItem("myCaddy_"+this.authService.authenticatedUser+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }

  public changeUserCady(newUsername){

    if(this.authService.authenticatedUser){

        localStorage.removeItem("ListCaddies_"+this.authService.authenticatedUser);
        this.saveListCaddiesUsername(newUsername,this.listCaddies);
      this.listCaddies.forEach(c=>{
         localStorage.removeItem("myCaddy_"+this.authService.authenticatedUser+"_"+c.name);
         this.saveCaddyUsername(newUsername,this.caddies[c.name])
      })
    }


  }

  saveCaddyUsername(username,caddy) {
    localStorage.setItem("myCaddy_"+username+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }

  saveListCaddiesUsername(username,listCaddies) {
    localStorage.setItem("ListCaddies_"+username,JSON.stringify(listCaddies));
  }

  getSize(){
    let caddy=this.caddies[this.currentCaddyName];
    return Object.keys(caddy.items).length;
  }

  emptyCaddy(){
    this.caddies=new Map();
    this.listCaddies=[];
  }

  getTotalCurrentCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    let total=0;
    for(let key in caddy.items ){
      total+=caddy.items[key].price*caddy.items[key].quantity;
    }
    return total;
  }

  addNewCaddy(c: { num: number; name: string }) {

    this.listCaddies.push(c);
    this.caddies[c.name]=new Caddy(c.name);
    localStorage.setItem("ListCaddies_"+this.authService.authenticatedUser,JSON.stringify(this.listCaddies));
  }

  setClient(client: Client) {
    this.getCaddy().client=client;
    this.saveCaddy();
  }


  removeCaddy(){

     console.log(this.listCaddies)
    this.listCaddies = this.listCaddies.filter(caddy=> caddy.name !== this.currentCaddyName)
    console.log(this.listCaddies)
    this.caddies.delete(this.currentCaddyName)

    this.currentCaddyName=this.listCaddies[this.listCaddies.length-1].name

    localStorage.setItem("ListCaddies_"+this.authService.authenticatedUser.username,JSON.stringify(this.listCaddies));

  }

}
