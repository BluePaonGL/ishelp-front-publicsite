import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/stock/api.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls : ['./list-product.component.scss'],
  
})
export class ListProductComponent implements OnInit{

  filteredString: string ='';
  constructor(
    private router: Router,
    private api : ApiService,
    private sanitizer: DomSanitizer,
    
  ){}
  
  public productList : any;
  

  ngOnInit(): void{
    this.getAllProducts();
  }

  getAllProducts(){
    this.api.getAllProduct()
    .subscribe({
      next:(res)=>{
        this.productList = res;
      },
      error:(err)=>{
        alert("Erreur en récupérant les données")
      }
      
    })
  }

  goToAddProduct(){
    this.router.navigate(['/stock/add']);
  }

  editProduct(id : number){
    this.router.navigate(['/stock/edit',id]);
  }
  
  deleteProduct(product : any){
    this.api.deleteProduct(product.productId)
    .subscribe({
      next: (res) =>{
        alert("Produit supprimé");
        this.getAllProducts;
      },
      error:()=>{
        alert("Erreur en supprimant le produit")
      }
      
    })
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }
  

}
