import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service'; // Update the path according to your structure
import { Product } from '../home/products/product.model'; // Update the path according to your structure

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discount: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      inStock: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productsService.addProduct(newProduct).subscribe(
        (response) => {
          console.log('Product added successfully', response);
          this.productForm.reset();
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    }
  }
}
