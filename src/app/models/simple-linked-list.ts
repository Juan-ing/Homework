export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: Node<T> | null = null;

  add(value: T): void {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  removeByValue(value: T): T | null {
    if (!this.head) {
      return null;
    }

    if (this.head.value === value) {
      const deleted = this.head.value;
      this.head = this.head.next;
      return deleted;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (!current.next) {
      return null;
    }

    const deleted = current.next.value;
    current.next = current.next.next;
    return deleted;
  }

  toArray(): T[] {
    const items: T[] = [];
    let current = this.head;

    while (current) {
      items.push(current.value);
      current = current.next;
    }

    return items;
  }
}
