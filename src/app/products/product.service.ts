import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

// const url = 'https://newdashboard-a850a.firebaseio.com/';
@Injectable({ providedIn: 'root' })
export class ProductService {
  productsChanged = new Subject<Product[]>();
  checkChanged = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //name: string, price: string, quantity: number, imgPath: string, description: string
  addProduct(data: Product) {
    return this.http.post(
      'https://newdashboard-a850a.firebaseio.com/products.json',
      data
    );
  }

  getAllProduct() {
    return this.http
      .get('https://newdashboard-a850a.firebaseio.com/products.json')
      .pipe(
        map((responeData) => {
          const productsArr: Product[] = [];
          for (const key in responeData) {
            if (responeData.hasOwnProperty(key)) {
              productsArr.push({ ...responeData[key], id: key });
            }
          }
          return productsArr;
        })
      );
  }


  getProductById(id: string) {
    return this.http
    .get<Product>('https://newdashboard-a850a.firebaseio.com/products/' + id + '.json');
  }

  updateProduct(data: Product){
    return this.http
    .put('https://newdashboard-a850a.firebaseio.com/products/' + data.id + '.json', data);
  }

  deleteProduct(id: string){
    return this.http
    .delete('https://newdashboard-a850a.firebaseio.com/products/' + id + '.json');
  }
}
