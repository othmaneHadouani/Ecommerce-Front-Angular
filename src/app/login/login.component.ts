import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  @ViewChild("ff") form

  user ={
    username:"",
    password:""
  }

  newUser = {
    username:"",
    password:"",
    confirmedPassword:""

  }
  registr =false;
  login=true;
  compatible=false
  existe=false
  auth=false
  constructor(private authService:AuthenticationService,
              private router:Router,
              private caddyService:CaddyService) { }

  ngOnInit() {
  }

  onLogin(user){


    this.authService.login(user.value).subscribe(

      res=>{

        this.caddyService.loadCaddyFromLocalStorage();
        this.router.navigateByUrl('');

      },err=>{

        this.auth=true
        console.log("error  login")
      },

      );

  }

  onRegistr(user){


    if(this.newUser.confirmedPassword!==this.newUser.password){
      this.compatible=true
    }
    else {
      this.authService.onRegistr(user).subscribe(res=>{
          this.user.password=user.password;
          this.user.username=user.username;
          this.onChangeForm()
        },
        error1 => {

          this.existe = true;
          console.log(this.form)
        })
    }

  }

  onChangeForm(){
    this.registr=!this.registr
    this.login=!this.login
  }

}
