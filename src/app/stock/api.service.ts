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

  AddModelData(product: any, id: any, file: File): Observable<any> 
  {
    const mData = JSON.stringify(product);
    const formData = new FormData();
    formData.append('product', mData);
    if (file) {
      formData.append('file', file, file.name);
    }

    /*const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'multipart/mixed', 'Access-Control-Allow-Origin': '*'})
    }*/

    return this.http.put(`${baseUrl}/editImage/${id}`, formData)
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
}
