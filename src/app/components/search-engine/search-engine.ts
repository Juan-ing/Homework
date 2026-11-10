import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchEngineService } from '../../services/search-engine';
import { Product } from '../../models/product';
import { ProductList } from '../product-list/product-list';
import { SearchResults } from '../search-results/search-results';

@Component({
  imports: [FormsModule, ProductList, SearchResults],
  selector: 'app-search-engine',
  styleUrl: './search-engine.css',
  templateUrl: './search-engine.html',
})
export class SearchEngine {
  protected prefix = 'air';
  protected topK = 3;
  protected productName = '';
  protected popularity: number | null = 50;
  protected formMessage = '';
  protected suggestions: Product[] = [];
  protected topProducts: Product[] = [];
  protected heapInserted = 0;
  protected heapSize = 0;
  protected products: Product[];

  constructor(private readonly searchEngine: SearchEngineService) {
    this.products = this.searchEngine.getProducts();
    this.search();
  }

  protected search(): void {
    const result = this.searchEngine.search(this.prefix, this.topK);
    this.suggestions = result.matches;
    this.topProducts = result.topK;
    this.heapInserted = result.heapInserted;
    this.heapSize = result.heapSize;
  }

  protected addProduct(): void {
    if (this.popularity === null || !Number.isFinite(this.popularity)) {
      this.formMessage = 'Ingresa una popularidad válida.';
      return;
    }

    const result = this.searchEngine.addProduct(this.productName, this.popularity);
    if (!result.success) {
      this.formMessage = result.message;
      return;
    }

    this.productName = '';
    this.formMessage = `"${result.product.name}" fue agregado.`;
    this.refreshProducts();
  }

  protected changePopularity(change: { id: number; amount: number }): void {
    this.searchEngine.adjustPopularity(change.id, change.amount);
    this.refreshProducts();
  }

  private refreshProducts(): void {
    this.products = this.searchEngine.getProducts();
    this.search();
  }
}
