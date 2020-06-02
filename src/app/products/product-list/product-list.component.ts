
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ProductActions from '../store/product.actions'
import * as fromProduct from '../store/product.reducer';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  isLoading = false;
  filteredName = '';
  subscription: Subscription;

  products$: Observable<Product[]>
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}


  ngOnInit(): void {
    this.store.dispatch(new ProductActions.LoadProducts());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.error$ = this.store.pipe(select(fromProduct.getError));

    this.isLoading$ = this.store.pipe(select(fromProduct.getProductLoading));
    this.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    })

  }
  onAddNew() {
    this.router.navigate(['dashboard/products/edit']);
  }
  onViewDetail(id: string) {
    // this.store.dispatch(new ProductActions.LoadProduct(id));
    this.router.navigate(['dashboard/products', id]);
  }


  onUpdate(id: string) {
    // this.store.dispatch(new ProductActions.LoadProduct(id));
    this.router.navigate(['dashboard/products', 'edit', id]);
  }

  onDelete(id: string) {
    if (confirm('Do you want to delete?')) {
      this.store.dispatch(new ProductActions.DeleteProduct(id));
    }
  }
  ngOnDestroy() {
  if(this.subscription) {
    this.subscription.unsubscribe();
  }
  }
}
