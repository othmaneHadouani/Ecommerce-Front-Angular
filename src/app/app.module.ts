import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './root/products/products.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { CaddyComponent } from './caddy/caddy.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './root/product/product.component';
import { PaymentComponent } from './payment/payment.component';
import { RootComponent } from './root/root.component';
import { OredersComponent } from './oreders/oreders.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";
import { JwtModule } from "@auth0/angular-jwt";
import { EditUserComponent } from './login/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    CaddyComponent,
    ClientComponent,
    ProductComponent,
    PaymentComponent,
    RootComponent,
    OredersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule,JwtModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
