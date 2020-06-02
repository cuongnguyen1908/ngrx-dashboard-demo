import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
// import * as ProductActions from './store/product.action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.store.dispatch(new ProductActions.GetProducts());
  }



}
