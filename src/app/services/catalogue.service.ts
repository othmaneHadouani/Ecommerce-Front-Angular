import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from "../../../node_modules/@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {map} from "rxjs/operators";


export class DataCat {
  constructor(private  products ){

  }
}


@Injectable({
  providedIn: 'root'
})
export class CatalogueService implements Resolve<DataCat> {
  public host:string="http://localhost:9110/microservice-produits";


  public currentCategorie
  public categories
  public products;
  constructor(private http:HttpClient) {
  }

  public getProduct(url){
    return this.http.get(this.host+url);
  }

  public getResource(url){
       this.http.get(this.host+url)
        .subscribe(
          data=>{
            console.log(data)
          this.products=data;
       // console.log("ptoducts  : ",this.products)
            }

      )
  }

  public getCategories(url){
     this.http.get(this.host+url).subscribe(
      res=>{

        console.log(res)
        this.categories=res
      },
      err =>{
        console.log(err)
      }
    )

  }
  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public patchResource(url,data){
    return this.http.patch(url,data);
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataCat> | Promise<DataCat> | DataCat {
    return new DataCat(this.products);
  }


}

