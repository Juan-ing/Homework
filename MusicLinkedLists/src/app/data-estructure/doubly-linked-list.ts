export class DoublyNode<T> {
  constructor(
    public data: T,
    public previous: DoublyNode<T> | null = null,
    public next: DoublyNode<T> | null = null
  ) {}
}

export class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private current: DoublyNode<T> | null = null;

  add(data: T): void {
    const newNode = new DoublyNode(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
      return;
    }

    newNode.previous = this.tail;
    this.tail!.next = newNode;

    this.tail = newNode;
    this.current = newNode;
  }

  goForward(): T | null {
    if (this.current !== null && this.current.next !== null) {
      this.current = this.current.next;
    }

    return this.current?.data ?? null;
  }

  goBack(): T | null {
    if (this.current !== null && this.current.previous !== null) {
      this.current = this.current.previous;
    }

    return this.current?.data ?? null;
  }

  getCurrent(): T | null {
    return this.current?.data ?? null;
  }

  canGoBack(): boolean {
    return this.current !== null && this.current.previous !== null;
  }

  canGoForward(): boolean {
    return this.current !== null && this.current.next !== null;
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