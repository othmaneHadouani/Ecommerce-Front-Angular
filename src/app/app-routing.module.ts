import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './root/products/products.component';
import {LoginComponent} from './login/login.component';
import {CaddyComponent} from './caddy/caddy.component';
import {ClientComponent} from './client/client.component';
import {ProductComponent} from './root/product/product.component';
import {PaymentComponent} from './payment/payment.component';
import {RootComponent} from "./root/root.component";
import {OredersComponent} from "./oreders/oreders.component";
import {resolve} from "q";
import {CatalogueService} from "./services/catalogue.service";
import {AuthGuardServiceService} from "./services/auth-guard-service.service";
import {AuthenticationService} from "./services/authentication.service";
import {EditUserComponent} from "./login/edit-user/edit-user.component";

const routes: Routes = [

  {path:'',redirectTo:'acceuil',pathMatch:'full',resolve: {
      someKey: AuthenticationService
    }},
  {path:'login', component:LoginComponent},
  {path:'edit-user', component:EditUserComponent},
  {path:'client', component:ClientComponent,canActivate: [AuthGuardServiceService]},
  {path:'orders', component:OredersComponent,canActivate: [AuthGuardServiceService]},
  {path:'caddy', component:CaddyComponent,canActivate: [AuthGuardServiceService]},
  {path:'payment/:orderID', component:PaymentComponent,canActivate: [AuthGuardServiceService]},
  {path:'acceuil', component:RootComponent,
    children:[
      {path:'',redirectTo:'products/1/0/',pathMatch:'full'},
      {path:'products/:p1/:p2/:p3',component:ProductsComponent},
      {path:'product/:id', component:ProductComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// resolve we can shoose  resolve for asynchron data + cmpnent == routing
