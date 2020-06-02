import { AuthModule } from './auth/auth.module';
import { ProductsRoutingModule } from './products/products-routing.module';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RootNavComponent } from './root-nav/root-nav.component';

import { AuthGuard } from './auth/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: RootNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'products',
        loadChildren: () =>
          import('../app/products/products.module').then((m) => ProductsModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => AuthModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
