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
  image: any;

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
    name : new FormControl(''),
    quantity : new FormControl(''),
    type : new FormControl(''),
    peremptionDate : new FormControl(''),
    consumptionDate : new FormControl(''),
    description : new FormControl(''),
    allergenSet : new FormControl(''),
    image : new FormControl('')
  })


  ngOnInit() {

    this.api.getProductById(this.router.snapshot.params['productId']).
    subscribe((result)=>{
      this.productEdit = new FormGroup({
        name : new FormControl(result['name']),
        quantity : new FormControl(result['quantity']),
        type : new FormControl(result['type']),
        peremptionDate : new FormControl(result['peremptionDate']),
        consumptionDate : new FormControl(result['consumptionDate']),
        description : new FormControl(result['description']),
        allergenSet : new FormControl(result['allergenSet']),
        image : new FormControl(result['image'])
      })
    })

  }

  updateProduct(){
    this.api.editProduct(parseInt(this.router.snapshot.params['productId']),this.productEdit.value, this.image)
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

}
