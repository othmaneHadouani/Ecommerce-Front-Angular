import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivateRoutes} from "../../../node_modules/@angular/router/src/operators/activate_routes";
import {AuthenticationService} from "../services/authentication.service";
import {map} from "rxjs/operators";
import {el} from "../../../node_modules/@angular/platform-browser/testing/src/browser_util";
import {__await} from "tslib";

@Component({
  selector: 'app-oreders',
  templateUrl: './oreders.component.html',
  styleUrls: ['./oreders.component.css']
})
export class OredersComponent implements OnInit {

  public orders



  constructor(private orderService:OrderService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthenticationService
              ) {


  }

  ngOnInit() {


    this.orderService.getOrdersByUserName(this.authService.authenticatedUser,0);
      console.log(this.orderService.orders)

  }

  payer(id){
    this.router.navigateByUrl("/payment/"+id);
  }

}
