import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from './../auth/auth-guard';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: ProductsComponent, pathMatch: 'full', children: [
    { path: '', component: ProductListComponent, pathMatch: 'full'}]
  },
  { path: 'edit', component: ProductEditComponent },
  { path: ':id', component: ProductDetailComponent },
  { path: 'edit/:id', component: ProductEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
