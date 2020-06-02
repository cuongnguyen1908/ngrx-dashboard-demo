import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import * as productActions from './product.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router
  ) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.LOAD_PRODUCTS),
    switchMap(() => {
      return this.productService.getAllProduct().pipe(
        map((products) => new productActions.LoadProductsSuccess(products)),
        catchError((err) => of(new productActions.LoadProductsFail(err)))
      );
    })
  );

  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.LOAD_PRODUCT),
    switchMap((action: productActions.LoadProduct) => {
      return this.productService.getProductById(action.payload).pipe(
        map(
          (product: Product) => new productActions.LoadProductSuccess(product)
        ),
        catchError((err) => of(new productActions.LoadProductFail(err)))
      );
    })
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CREATE_PRODUCT),
    map((action: productActions.CreateProduct) => action.payload),
    switchMap((product: Product) => {
      return this.productService.addProduct(product).pipe(
        map(
          (newProduct: Product) =>
            new productActions.CreateProductSuccess(newProduct)
        ),
        catchError((error) => of(new productActions.CreateProductFail(error)))
      );
    }),
    tap(() => this.router.navigate(['/dashboard/products']))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UPDATE_PRODUCT),
    map((action: productActions.UpdateProduct) => action.payload),
    switchMap((product: Product) => {
      return this.productService.updateProduct(product).pipe(
        map(
          (updateProduct: Product) =>
            new productActions.UpdateProductSuccess({
              id: updateProduct.id,
              changes: updateProduct,
            })
        ),
        catchError((error) => of(new productActions.UpdateProductFail(error)))
      );
    }),
    tap(() => this.router.navigate(['/dashboard/products']))
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DELETE_PRODUCT),
    map((action: productActions.DeleteProduct) => action.payload),
    switchMap((id: string) => {
      return this.productService.deleteProduct(id).pipe(
        map(() => new productActions.DeleteProductSuccess(id)),
        catchError((error) => of(new productActions.DeleteProductFail(error)))
      );
    })
  );
}
