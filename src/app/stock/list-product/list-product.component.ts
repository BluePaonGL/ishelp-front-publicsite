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
  
  currentDate = new Date();
  diffBetweenTwoDate(date1 : Date, date2 : Date){
    var dateOne = new Date(date1);
    var dateTwo = new Date(date2);
    var Difference_In_Time = dateTwo.getTime() - dateOne.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }
  
  seeMessage(){
    alert("Votre produit périme dans moins de deux semaines")
  }

/*
  const base64 = '...';
  const imageName = 'name.png';
  const imageBlob = this.dataURItoBlob(base64);
  const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
  */

  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    console.log(blob)
    return blob;
 }

}
