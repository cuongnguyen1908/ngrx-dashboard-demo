import { Product } from './../product.model';
import * as ProductActions from './product.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<Product> {
  selectedProductId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}
export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();
export const defaultProduct: State = {
  ids: [],
  entities: {},
  selectedProductId: null,
  loading: false,
  loaded: false,
  error: ""
}

export const initialState = productAdapter.getInitialState(defaultProduct);

export function productReducer(state = initialState,  action: ProductActions.ProductsActions
) {
  switch (action.type) {
    case ProductActions.ProductActionTypes.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActions.ProductActionTypes.LOAD_PRODUCTS_SUCCESS: {
      return productAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case ProductActions.ProductActionTypes.LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    //LOAD PRODUCT
    case ProductActions.ProductActionTypes.LOAD_PRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActions.ProductActionTypes.LOAD_PRODUCT_SUCCESS: {
      return productAdapter.addOne(action.payload, {
        ...state,
        loading: false,
         selectedProductId: action.payload.id
      });
    }
    case ProductActions.ProductActionTypes.LOAD_PRODUCT_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    //CREATE PRODUCT
    case ProductActions.ProductActionTypes.CREATE_PRODUCT_SUCCESS: {
      return productAdapter.addOne(action.payload, state);
    }
    case ProductActions.ProductActionTypes.CREATE_PRODUCT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    //UPDATE PRODUCT
    case ProductActions.ProductActionTypes.UPDATE_PRODUCT_SUCCESS:{
      return productAdapter.updateOne(action.payload,state);
    }

    case ProductActions.ProductActionTypes.UPDATE_PRODUCT_FAIL:{
      return {
        ...state,
        error: action.payload
      };
    }

    //DELETE PRODUCT
    case ProductActions.ProductActionTypes.DELETE_PRODUCT_SUCCESS: {
      return productAdapter.removeOne(action.payload, state);
    }

    case ProductActions.ProductActionTypes.DELETE_PRODUCT_FAIL: {
      return {
        ...state,
        error: action
      }
    }


    default:
      return state;
  }

}

const getProductFeatureState = createFeatureSelector<State>("products");

export const getProducts = createSelector(
  getProductFeatureState,
  productAdapter.getSelectors().selectAll
);

export const getProductLoading = createSelector(
  getProductFeatureState,
  (state: State) => state.loading
);
export const getProductLoaded = createSelector(
  getProductFeatureState,
  (state: State) => state.loaded
);
export const getError = createSelector(
  getProductFeatureState,
  (state: State) => state.error

);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: State) => state.selectedProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state: State) => state.entities[state.selectedProductId]
);



