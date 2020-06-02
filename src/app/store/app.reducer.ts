import * as fromProducts from '../products/store/product.reducer';


export interface AppState {
  products: fromProducts.State
}
