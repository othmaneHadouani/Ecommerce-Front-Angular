import {Client} from '../model/client.model';
import {ItemProduct} from '../model/item-product.model';
import {CaddyService} from './caddy.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from './catalogue.service';
import {Order} from '../model/Order.model';
import {Observable} from 'rxjs';
import {HttpHeaders} from "../../../node_modules/@angular/common/http";
import {__await} from "tslib";
@Injectable({
  providedIn:'root'
})
export class OrderService {

  public order:Order=new Order();
  public orders

  public host:string="http://localhost:8444";

  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatalogueService){
    console.log("constructeur Order")
  }

  public setClient(client:Client){

 //   console.log(client)
    this.order.client=client;
  }
  public loadProductsFromCaddy(){
    this.order.products=[];
   for(let key in this.caddyService.getCaddy().items){
     this.order.products.push(this.caddyService.getCaddy().items[key]);
   }
   this.order.date=new Date();
  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(this.host+"/orders",this.order);
  }

    public getOrder(id:number):Observable<Order>{
    return   this.httpClient.get<Order>(this.host+"/orders/"+id);
  }

  public getOrdersByUserName(usernmae,page){

    let user ={username:usernmae,walo:"walo"}
    return this.httpClient.post(this.host+"/getOrdersUser?page="+page,user).subscribe(
      res=>{

        this.orders=res
      },
      err =>{
        console.log(err)
      }
    );
  }

  public payOrder(payment){

    return this.httpClient.post(this.host+"/payOrder",payment);
  }


}
