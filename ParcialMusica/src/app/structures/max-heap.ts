export interface PopularItem {
  id: string;
  plays: number;
}

export class MaxHeap<T extends PopularItem> {
  private readonly items: T[] = [];
  private readonly positions = new Map<string, number>();

  insert(item: T): void {
    this.validatePlays(item.plays);
    const existingIndex = this.positions.get(item.id);
    if (existingIndex !== undefined) {
      this.items[existingIndex] = item;
      this.reorder(existingIndex);
      return;
    }

    this.positions.set(item.id, this.items.length);
    this.items.push(item);
    this.siftUp(this.items.length - 1);
  }

  updatePlays(id: string, plays: number): boolean {
    this.validatePlays(plays);
    const index = this.positions.get(id);
    if (index === undefined) return false;

    this.items[index].plays = plays;
    this.reorder(index);
    return true;
  }

  getMostPopular(): T | undefined {
    return this.items[0];
  }

  top(limit = 5): T[] {
    if (!Number.isFinite(limit) || limit <= 0) return [];

    const copy = new MaxHeap<T>();
    for (const item of this.items) copy.insert(item);

    const result: T[] = [];
    while (result.length < Math.floor(limit)) {
      const item = copy.extractMax();
      if (!item) break;
      result.push(item);
    }
    return result;
  }

  private reorder(index: number): void {
    const parentIndex = Math.floor((index - 1) / 2);
    if (index > 0 && this.hasHigherPriority(index, parentIndex)) {
      this.siftUp(index);
    } else {
      this.siftDown(index);
    }
  }

  private siftUp(startIndex: number): void {
    let index = startIndex;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (!this.hasHigherPriority(index, parentIndex)) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private siftDown(startIndex: number): void {
    let index = startIndex;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let highest = index;
      if (left < this.items.length && this.hasHigherPriority(left, highest)) highest = left;
      if (right < this.items.length && this.hasHigherPriority(right, highest)) highest = right;
      if (highest === index) break;
      this.swap(index, highest);
      index = highest;
    }
  }

  private hasHigherPriority(first: number, second: number): boolean {
    const firstItem = this.items[first];
    const secondItem = this.items[second];
    return (
      firstItem.plays > secondItem.plays ||
      (firstItem.plays === secondItem.plays && firstItem.id.localeCompare(secondItem.id) < 0)
    );
  }

  private swap(first: number, second: number): void {
    [this.items[first], this.items[second]] = [this.items[second], this.items[first]];
    this.positions.set(this.items[first].id, first);
    this.positions.set(this.items[second].id, second);
  }

  private extractMax(): T | undefined {
    const highest = this.items[0];
    if (!highest) return undefined;

    const last = this.items.pop();
    this.positions.delete(highest.id);
    if (this.items.length && last) {
      this.items[0] = last;
      this.positions.set(last.id, 0);
      this.siftDown(0);
    }
    return highest;
  }

  private validatePlays(plays: number): void {
    if (!Number.isFinite(plays) || plays < 0) {
      throw new RangeError('Las reproducciones deben ser un número finito no negativo.');
    }
  }
}
