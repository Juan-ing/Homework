import { MaxHeap } from './max-heap';
import { Product } from './product';

describe('MaxHeap', () => {
  const products: Product[] = [
    { id: 1, name: 'air max', popularity: 90 },
    { id: 2, name: 'air force', popularity: 95 },
    { id: 3, name: 'air jordan', popularity: 85 },
  ];

  it('returns products in descending popularity order', () => {
    const heap = new MaxHeap();
    products.forEach((product) => heap.push(product));

    expect(heap.peek()).toBe(products[1]);
    expect([heap.pop(), heap.pop(), heap.pop()]).toEqual([
      products[1],
      products[0],
      products[2],
    ]);
    expect(heap.pop()).toBeNull();
    expect(heap.size()).toBe(0);
  });

  it('heapifies an array and returns a copy of its internal array', () => {
    const heap = new MaxHeap(products);
    const values = heap.toArray();
    values.pop();

    expect(heap.size()).toBe(3);
    expect(heap.pop()).toBe(products[1]);
  });
});
