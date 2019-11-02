import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../model/Order.model';
import {OrderService} from '../services/order.service';
import {Payment} from "../model/payment.model";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  currentOrder:Order;
  payment:Payment = new Payment()
  constructor(private router:Router, private route:ActivatedRoute,
              private orderService:OrderService) { }

  ngOnInit() {
    let id=this.route.snapshot.params.orderID
    this.orderService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
      this.payment.idOrder=id;
    },err=>{
      console.log(err);
    })
  }

  onPayOrder(data) {
    this.payment.codeVrif=data.codeVrif
    this.payment.cardNumber=data.cardNumber
    this.payment.type=data.type

    this.orderService.payOrder(this.payment).subscribe(
      res=>{
        this.router.navigateByUrl("/orders")
      },
      error1 => {
        console.log(error1)
      }
    )
  }
}
