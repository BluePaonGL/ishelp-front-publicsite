import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:3000/products';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getAllProduct(): Observable<any> {
    return this.http.get(`${baseUrl}/all`);
  }
  getProductById(id : any): Observable<any> {
    return this.http.get(`${baseUrl}/findProductById/${id}`);
  }
  getProductByName(name : String): Observable<any> {
    return this.http.get(`${baseUrl}/findProductByName/${name}`);
  }

  addProduct(data : any): Observable<any> {
    return this.http.post(`${baseUrl}/addProduct`, data);
  }
  editProduct(data : any, id : any): Observable<any> {
    return this.http.put(`${baseUrl}/editProduct/${id}`, data);
  }

  /* WITH IMAGE
  addProduct(data : any, file : File): Observable<any> {
    return this.http.post(`${baseUrl}/addProduct`, {product: data, file: file});
  }
  editProduct(data : any, id : any, file : FormData): Observable<any> {
    //const headers = new HttpHeaders().set('Content-Type','multipart/form-data');
    return this.http.put(`${baseUrl}/editProduct/${id}`, {data, id, file}); //,{headers:headers}
  }*/
  deleteProduct(id : any): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteProduct/${id}`);
  }

  /*constructor(
    private http : HttpClient
  ) { }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/products/addProduct",data);
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  getProductById(id : number){
    return this.http.get<any>("http://localhost:3000/productList/"+id);
  }

  updateProduct(id : number,data : any){
    return this.http.put<any>("http://localhost:3000/productList/"+id,data);
  }

  deleteProduct(id : number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }

*/
}
