import { Component, OnInit } from '@angular/core';
import {Client} from '../model/client.model';
import {OrderService} from '../services/order.service';
import {AuthenticationService} from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public mode:number=0;
  panelStyle:string= "panel-default";
  constructor(public orderService:OrderService,
              private authService:AuthenticationService,
              public caddyService:CaddyService,
              private router:Router) { }

  ngOnInit() {
   /* if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }*/



  }

  onSaveClient(client:Client) {


    client.username=this.authService.authenticatedUser;
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    this.mode=1;
  }

  onOrder() {
    this.orderService.submitOrder().subscribe(data=>{

     //² console.log(data)
      this.router.navigateByUrl("/orders");
    },err=>{
      console.log(err);
    });
  }


}
