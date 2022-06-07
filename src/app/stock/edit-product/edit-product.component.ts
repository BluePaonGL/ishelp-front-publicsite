import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/stock/api.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-product',
  templateUrl:'./edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  listAllergen: string | undefined;
  allergens: string[] = [
    'Gluten',
    'Œuf',
    'Poisson',
    'Lait',
    'Arachides',
    'Soja',
    'Fruits à coque',
    'Céleri'];
  
  listSubProduct: string | undefined;
  subProducts: string[] = [
    'Conserve',
    'Légume',
    'Fruit',
    'Féculents',
    'Produits menstruels',
    'Livre'
  ];
  currentDate = new Date();

  constructor(
    private router:ActivatedRoute,
    private formBuilder : FormBuilder,
    private api : ApiService,
    private route: Router
  ) { }

  add(event: MatChipInputEvent, list: string[]): void {
    const value = (event.value || '').trim();
    if (value) {
      list.push(value);
    }
    event.chipInput!.clear();
  }
  remove(product: string, list: string[]): void {
    const index = list.indexOf(product);

    if (index >= 0) {
      list.splice(index, 1);
    }
  }

  goToProductList(){
    this.route.navigate(['/stock']);
  }

  productEdit = new FormGroup({
    productName : new FormControl(''),
    quantity : new FormControl(''),
    category : new FormControl(''),
    expiration_date : new FormControl(''),
    description : new FormControl(''),
    allergen : new FormControl(''),
    type_of_subproduct : new FormControl(''),
    image : new FormControl('')
  })


  ngOnInit() {

    this.api.getProductById(this.router.snapshot.params['id']).
    subscribe((result)=>{
      this.productEdit = new FormGroup({
        productName : new FormControl(result['productName']),
        quantity : new FormControl(result['quantity']),
        category : new FormControl(result['category']),
        expiration_date : new FormControl(result['expiration_date']),
        description : new FormControl(result['description']),
        allergen : new FormControl(result['allergen']),
        type_of_subproduct : new FormControl(result['type_of_subproduct']),
        image : new FormControl(result['image'])
      })
    })

  }

  updateProduct(){
    this.api.updateProduct(this.router.snapshot.params['id'],this.productEdit.value)
    .subscribe({
      next:(res)=>{
        alert("Produit modifié avec succès");
        this.productEdit.reset();
        this.route.navigate(['/stock']);
      },
      error:()=>{
        alert("Erreur lors de la modification du produit");
      }

    })
  }

  onFileChange(event : any) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.productEdit.patchValue({
        fileSource: image
      });
    }
  }

}
