import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Products } from '../shared/model/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'https://fakestoreapi.com/products';

  private readonly _products = new BehaviorSubject<Products[]>([]);
  public products$ = this._products.asObservable();

  private readonly _idSubject = new Subject<Products | null>();
  public idSubject$ = this._idSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseUrl);
  }

  returnAllProducts() {
    return this.getAllProducts().subscribe((data) => {
      this._products.next(data);
    });
  }

  getById(id: string | null): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/${id}`);
  }

  returnProductById(id: string | null) {
    return this.getById(id).subscribe((data: any) => {
      return this._idSubject.next(data);
    });
  }
}
