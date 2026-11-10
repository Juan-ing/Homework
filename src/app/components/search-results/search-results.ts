import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  imports: [],
  selector: 'app-search-results',
  styleUrl: './search-results.css',
  templateUrl: './search-results.html',
})
export class SearchResults {
  @Input() prefix = '';
  @Input() suggestions: Product[] = [];
  @Input() topProducts: Product[] = [];
  @Input() topK = 0;
  @Input() productCount = 0;
  @Input() heapInserted = 0;
  @Input() heapSize = 0;
}
