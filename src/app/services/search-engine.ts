import { Injectable } from '@angular/core';
import { MaxHeap } from '../models/max-heap';
import { Product } from '../models/product';
import { Trie } from '../models/trie';

export interface SearchSnapshot {
  matches: Product[];
  topK: Product[];
  heapInserted: number;
  heapSize: number;
}

export type AddProductResult =
  | { success: true; product: Product }
  | { success: false; message: string };

@Injectable({ providedIn: 'root' })
export class SearchEngineService {
  private readonly trie = new Trie();
  private readonly products: Product[] = [];
  private nextId = 1;

  constructor() {
    const initialProducts: Omit<Product, 'id'>[] = [
      { name: 'air max', popularity: 90 },
      { name: 'air force', popularity: 95 },
      { name: 'air jordan', popularity: 85 },
      { name: 'air trainer', popularity: 83 },
      { name: 'adidas boost', popularity: 80 },
      { name: 'adidas forum', popularity: 75 },
      { name: 'adidas superstar', popularity: 88 },
      { name: 'adidas samba', popularity: 92 },
      { name: 'puma future', popularity: 82 },
      { name: 'puma runner', popularity: 70 },
      { name: 'new balance 550', popularity: 78 },
      { name: 'new balance 9060', popularity: 87 },
      { name: 'asics gel', popularity: 84 },
      { name: 'asics kayano', popularity: 89 },
      { name: 'reebok classic', popularity: 77 },
    ];

    for (const product of initialProducts) {
      this.storeProduct(product.name, product.popularity);
    }
  }

  getProducts(): Product[] {
    return this.products.map((product) => ({ ...product }));
  }

  searchPrefix(prefix: string): Product[] {
    return this.trie.searchPrefix(prefix);
  }

  searchTopK(prefix: string, k: number): Product[] {
    return this.search(prefix, k).topK;
  }

  search(prefix: string, k: number): SearchSnapshot {
    const matches = this.searchPrefix(prefix);
    const heap = new MaxHeap();
    for (const product of matches) {
      heap.push(product);
    }

    const heapInserted = heap.size();
    const topK: Product[] = [];
    const resultCount = Number.isFinite(k) ? Math.min(heap.size(), Math.max(0, Math.floor(k))) : 0;

    for (let index = 0; index < resultCount; index++) {
      const product = heap.pop();
      if (product) {
        topK.push(product);
      }
    }

    return {
      matches,
      topK,
      heapInserted,
      heapSize: heap.size(),
    };
  }

  addProduct(name: string, popularity: number): AddProductResult {
    const normalizedName = name.trim().replace(/\s+/g, ' ');
    if (!normalizedName) {
      return { success: false, message: 'El nombre del producto es obligatorio.' };
    }
    if (!Number.isFinite(popularity) || popularity < 0) {
      return { success: false, message: 'La popularidad debe ser un número mayor o igual a cero.' };
    }

    const existing = this.products.some(
      (product) => product.name.toLowerCase() === normalizedName.toLowerCase(),
    );
    if (existing) {
      return { success: false, message: 'Ya existe un producto con ese nombre.' };
    }

    return {
      success: true,
      product: this.storeProduct(normalizedName, popularity),
    };
  }

  adjustPopularity(id: number, amount: number): boolean {
    const product = this.products.find((item) => item.id === id);
    if (!product || !Number.isFinite(amount)) {
      return false;
    }

    product.popularity = Math.max(0, product.popularity + amount);
    return true;
  }

  private storeProduct(name: string, popularity: number): Product {
    const product: Product = {
      id: this.nextId++,
      name,
      popularity,
    };

    this.products.push(product);
    this.trie.insert(product);
    return product;
  }
}
