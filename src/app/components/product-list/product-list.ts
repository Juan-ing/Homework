import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  @Input() products: Product[] = [];
  @Output() popularityChange = new EventEmitter<{ id: number; amount: number }>();
}
