import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  categories;

  constructor(public catService:CatalogueService,
              private  router:Router){}

  ngOnInit(): void {
    this.getCategories();

  }

  private getCategories() {
    this.catService.getCategories("/categories");
  }

  getProductsByCat(c) {
    console.log(c)
    this.catService.currentCategorie=c;
    this.router.navigateByUrl('acceuil/products/2/'+c.id+'/');
  }


}
