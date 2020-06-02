import { Product } from './../product.model';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export enum ProductActionTypes {
  LOAD_PRODUCTS = '[Product] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success',
  LOAD_PRODUCTS_FAIL = '[Product] Load Products Fail',

  LOAD_PRODUCT = '[Product] Load Product',
  LOAD_PRODUCT_SUCCESS = '[Product] Load Product Success',
  LOAD_PRODUCT_FAIL = '[Product] Load Product Fail',

  CREATE_PRODUCT = '[Product] Create Product',
  CREATE_PRODUCT_SUCCESS = '[Product] Create Product Success',
  CREATE_PRODUCT_FAIL = '[Product] Create Product Fail',

  UPDATE_PRODUCT = '[Product] Update Product',
  UPDATE_PRODUCT_SUCCESS = '[Product] Update Product Success',
  UPDATE_PRODUCT_FAIL = '[Product] Update Product Fail',

  DELETE_PRODUCT = '[Product] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success',
  DELETE_PRODUCT_FAIL = '[Product] Delete Product Fail',
}

// Products
export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCTS;
}
export class LoadProductsSuccess implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {}
}
export class LoadProductsFail implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL;
  constructor(public payload: string) {}
}

// Product
export class LoadProduct implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCT;
  constructor(public payload: string) {}
}
export class LoadProductSuccess implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}
export class LoadProductFail implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCT_FAIL;
  constructor(public payload: string) {}
}

//Create product
export class CreateProduct implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCT;
  constructor(public payload: Product) {}

}
export class CreateProductSuccess implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}
export class CreateProductFail implements Action {
  readonly type = ProductActionTypes.CREATE_PRODUCT_FAIL;
  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCT;

  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCT_SUCCESS;

  constructor(public payload: Update<Product>) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UPDATE_PRODUCT_FAIL;

  constructor(public payload: string) {}
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT;
  constructor(public payload: string) {}
}
export class DeleteProductSuccess implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS;
  constructor(public payload: string) {}
}
export class DeleteProductFail implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT_FAIL;
  constructor(public payload: string) {}
}

export type ProductsActions =
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail
  | LoadProduct
  | LoadProductFail
  | LoadProductSuccess
  | CreateProduct
  | CreateProductFail
  | CreateProductSuccess
  | UpdateProduct
  | UpdateProductFail
  | UpdateProductSuccess
  | DeleteProduct
  | DeleteProductFail
  | DeleteProductSuccess;
