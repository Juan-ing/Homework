export class CircularDoubleNode<T> {
  value: T;
  next: CircularDoubleNode<T> | null;
  prev: CircularDoubleNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class CircularDoublyLinkedList<T> {
  head: CircularDoubleNode<T> | null = null;
  tail: CircularDoubleNode<T> | null = null;

  add(value: T): void {
    const newNode = new CircularDoubleNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
      return;
    }

    newNode.prev = this.tail;
    newNode.next = this.head;
    this.tail!.next = newNode;
    this.head.prev = newNode;
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
