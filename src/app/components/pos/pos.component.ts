import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  products: Product[] = [];
  items: any[] = [];
  total: number = 0;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.initializeItems();
    });
  }

  initializeItems(): void {
    this.items = this.products.map(product => ({
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      quantity: 1
    }));
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout(): void {
    alert('Checkout successful!');
  }

}
