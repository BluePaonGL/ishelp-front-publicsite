import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/stock/api.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit  {
  allergens: string[] = [
    'Gluten',
    'Œuf',
    'Poisson',
    'Lait',
    'Arachides',
    'Soja',
    'Fruits à coque',
    'Céleri'];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  productForm! : FormGroup;
  currentDate = new Date();
  image: any;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder : FormBuilder,
    private api : ApiService,

  ){}
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

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productId : [''],
      name : ['', [Validators.required, Validators.minLength(2)]],
      quantity : ['', [Validators.required, Validators.min(1)]],
      type : ['', Validators.required],
      peremptionDate : [''],
      consumptionDate : [''],
      description : [''],
      allergenSet : [''],
      image: ['']
    });

  }



  addProduct(){
    if(this.productForm.valid){
      this.api.addProduct(this.productForm.value, this.image.value)
      .subscribe({
        next:(res)=>{
          alert("Produit ajouté avec succès");
          this.productForm.reset();
          this.router.navigate(['/stock'])
        },
        error:()=>{
          alert("Erreur en ajoutant le produit")
        }
      })
    }
  }
  
  goToProductList(){
    this.router.navigate(['/stock']);
  }

  onFileChange(event : any) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.productForm.patchValue({
        fileSource: image
      });
    }
  }
  
}
