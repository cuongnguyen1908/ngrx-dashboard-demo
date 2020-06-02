import { ProductEffect } from './store/product.effect';
import { EffectsModule } from '@ngrx/effects';
import { ProductsRoutingModule } from './products-routing.module';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './filter.pipe';
import { SharedModule } from './../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    ProductsComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    FilterPipe

  ],
  imports: [
    FormsModule,
    RouterModule,
    ProductsRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ProductEffect])
  ]
})
export class ProductsModule {}
