export class CircularNode<T> {
  value: T;
  next: CircularNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class CircularLinkedList<T> {
  head: CircularNode<T> | null = null;
  tail: CircularNode<T> | null = null;

  add(value: T): void {
    const newNode = new CircularNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      return;
    }

    newNode.next = this.head;
    this.tail!.next = newNode;
    this.tail = newNode;
  }

  toArray(): T[] {
    const result: T[] = [];

    if (!this.head) {
      return result;
    }

    let current = this.head;
    do {
      result.push(current.value);
      current = current.next!;
    } while (current !== this.head);

    return result;
  }
}
