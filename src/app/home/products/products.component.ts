import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from 'src/app/products.service';
import { SharedService } from 'src/app/shared.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productSvs: ProductsService,
    private sharedSvc: SharedService
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.setupFilters();
  }

  fetchProducts() {
    this.productSvs.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.applyFilters(); // Apply filters after fetching products
    });
  }

  setupFilters() {
    // Listen to changes in the search string
    this.sharedSvc.searchString$.subscribe(() => {
      this.applyFilters();
    });

    // Listen to changes in the selected categories
    this.sharedSvc.selectedCategories$.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const searchString = this.sharedSvc.getSearchString().toLowerCase();
    const selectedCategories = this.sharedSvc.getSelectedCategories();

    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchString);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      return matchesSearch && matchesCategory;
    });
  }
}
