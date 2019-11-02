import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {map, publish} from "rxjs/operators";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {from, Observable} from "rxjs";
import * as jwt_decode from "jwt-decode"
import {CaddyService} from "./caddy.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  implements Resolve<Data>{
  public host:string="http://localhost:8448";
  public authenticatedUser


  constructor(private http:HttpClient) {
    this.loadUser();
  }

  login(user){

   return  this.http.post(this.host+"/login",{username:user.username, password:user.password},{observe: 'response'})
     .pipe(
         map(
           userData => {
             localStorage.setItem('username',user.username);
             let tokenStr= userData.headers.get('Authorization');
             localStorage.setItem('token', tokenStr);
             this.authenticatedUser=user.username;
             return userData;
           }
         )

       )
  }

  loadUser(){

    if(this.isAuthenticated()){

      this.authenticatedUser=localStorage.getItem('username');
    }
  }

  isAdmin(){
    if(this.authenticatedUser){
      return this.authenticatedUser.roles.indexOf("ADMIN")>-1;
    }
    else return false;
  }

  public isAuthenticated(): boolean {

    let token = this.getToken();
    if(!token) {
      return false;
    }

    const date = this.getTokenExpirationDate(token);

    if(date === undefined){
      return false;
    }

    return (date.valueOf() > new Date().valueOf());
  }

  logout(){

    this.authenticatedUser=undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  onRegistr(user: any) {

    return this.http.post(this.host+"/register",user,{headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response'});

  }

  getToken(){
    return localStorage.getItem("token");
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  onChangeUsername(username){

    let user ={
      newUserName:username,
      lastUserName:this.authenticatedUser
    }

    return this.http.post(this.host+"/editUserName",user).pipe(
      map(res=>{


        return res;
      })
    );

  }

  onChangePassword(password,confirmedPassword){
    let user ={
      username:this.authenticatedUser,
      password:password,
      confirmedPassword:confirmedPassword
    }


    return this.http.post(this.host+"/editPassword",user).pipe(
      map(res=>{

        console.log("binajah")
        return res;
      })
    );

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Data> | Promise<Data> | Data {

    return new Data(this.isAuthenticated(),this.authenticatedUser);

  }
}

export class Data {
  constructor(private  authenticated ,private authenticatedUser){

  }
}
