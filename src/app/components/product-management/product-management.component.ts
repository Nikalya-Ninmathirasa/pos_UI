import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  product: Product = new Product();
  
  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.product.productId) {
      // Update 
      this.productService.updateProduct(this.product).subscribe(() => {
        this.loadProducts(); 
        this.product = new Product();
      });
    } else {
      // Add new product
      this.productService.addProduct(this.product).subscribe(() => {
        this.loadProducts();
        this.product = new Product();
      });
    }
  }

  // can be edit product
  editProduct(product: Product): void {
    this.product = { ...product };
  }

  // can be delete product
  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts(); // Refresh 
    });
  }

  // ccategory in dropdown using API
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : 'Unknown';
  }

}
