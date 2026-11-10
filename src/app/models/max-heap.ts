import { Product } from './product';

export class MaxHeap {
  private heap: Product[] = [];

  constructor(products: Product[] = []) {
    this.heapify(products);
  }

  push(product: Product): void {
    this.heap.push(product);
    this.percolateUp(this.heap.length - 1);
  }

  pop(): Product | null {
    if (this.heap.length === 0) {
      return null;
    }

    const maximum = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0 && last) {
      this.heap[0] = last;
      this.percolateDown(0);
    }

    return maximum;
  }

  peek(): Product | null {
    return this.heap[0] ?? null;
  }

  heapify(products: Product[] = this.heap): void {
    this.heap = [...products];
    for (let index = Math.floor(this.heap.length / 2) - 1; index >= 0; index--) {
      this.percolateDown(index);
    }
  }

  percolateUp(index: number): void {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[parentIndex].popularity >= this.heap[currentIndex].popularity) {
        break;
      }

      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  percolateDown(index: number): void {
    let currentIndex = index;

    while (true) {
      const leftIndex = 2 * currentIndex + 1;
      const rightIndex = 2 * currentIndex + 2;
      let largestIndex = currentIndex;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex].popularity > this.heap[largestIndex].popularity
      ) {
        largestIndex = leftIndex;
      }
      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex].popularity > this.heap[largestIndex].popularity
      ) {
        largestIndex = rightIndex;
      }
      if (largestIndex === currentIndex) {
        break;
      }

      this.swap(currentIndex, largestIndex);
      currentIndex = largestIndex;
    }
  }

  swap(firstIndex: number, secondIndex: number): void {
    [this.heap[firstIndex], this.heap[secondIndex]] = [
      this.heap[secondIndex],
      this.heap[firstIndex],
    ];
  }

  size(): number {
    return this.heap.length;
  }

  toArray(): Product[] {
    return [...this.heap];
  }
}
