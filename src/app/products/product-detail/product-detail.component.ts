import { Observable } from 'rxjs';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../store/product.reducer';
import * as ProductActions from '../store/product.actions'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id: string;
  product: Product;
  isLoading$: Observable<boolean>;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new ProductActions.LoadProduct(this.id));

    const product$ = this.store.select(fromProduct.getCurrentProduct);

    product$.subscribe((currentProduct) => {
      this.product = currentProduct;
    });
    this.isLoading$ = this.store.pipe(select(fromProduct.getProductLoading));
    this.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    })
  }


  onBack() {
    this.router.navigate(['/dashboard/products']);
  }

  onUpdate() {
    this.store.dispatch(new ProductActions.LoadProduct(this.id));
    this.router.navigate(['dashboard/products', 'edit', this.id]);
  }
}
