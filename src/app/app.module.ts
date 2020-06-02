import { environment } from './../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './products/store/product.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

@NgModule({
  declarations: [
    AppComponent,
    RootNavComponent,
    HomeComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([]
    ),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),


    BrowserAnimationsModule,
    LayoutModule,
    ChartsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatExpansionModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
