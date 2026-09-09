export class Node<T> {
  constructor(
    public data: T,
    public next: Node<T> | null = null
  ) {}
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private size = 0;

  add(data: T): void {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;

      while (current.next !== null) {
        current = current.next;
      }

      current.next = newNode;
    }

    this.size++;
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    return current!.data;
  }

  getSize(): number {
    return this.size;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }
}