import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as ProductActions from '../store/product.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromProduct from '../store/product.reducer';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  @ViewChild('f', { static: false }) productForm;
  defaultStatus = 'enable';
  editMode = false;
  id: string;
  submited = false;
  // isLoading = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editMode = this.id != null;


    if (this.editMode) {
    this.store.dispatch(new ProductActions.LoadProduct(this.id));

      const product$ = this.store.select(fromProduct.getCurrentProduct);

      product$.subscribe((currentProduct) => {
        if (currentProduct) {
          this.formInit(
            currentProduct.name,
            currentProduct.price,
            currentProduct.quantity,
            currentProduct.status,
            currentProduct.description,
            currentProduct.imgPath
          );
        }
      });
    }
  }
  onBack() {
    this.router.navigate(['/dashboard/products']);
  }

  formInit(
    name: string,
    price: number,
    quantity: number,
    status: string,
    description: string,
    imgPath: string
  ) {
    this.productForm.setValue({
      name: name,
      price: price,
      quantity: quantity,
      status: status,
      description: description,
      imgPath: imgPath,
    });
  }

  onSubmit() {

    let product= new Product();
    const data = Object.assign(product, this.productForm.value);

    if (this.editMode) {
      //update
      this.store.dispatch(new ProductActions.UpdateProduct(data));

    } else {
      //add

      this.store.dispatch(new ProductActions.CreateProduct(data));
    }
  }

  onClear() {
    this.productForm.reset();
    this.editMode = false;
    this.submited = false;
  }
}
