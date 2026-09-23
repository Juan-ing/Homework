export interface Person {
  nombre: string;
  montoRetiro: number;
  fechaLlegada: Date;
}

export class Node {
  value: Person;
  next: Node | null;

  constructor(value: Person) {
    this.value = value;
    this.next = null;
  }
}

export class Queue {
  private head: Node | null = null;
  private tail: Node | null = null;
  private queueSize = 0;

  enqueue(person: Person): void {
    const node = new Node(person);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.queueSize++;
  }

  dequeue(): Person | null {
    if (this.isEmpty()) {
      return null;
    }

    const current = this.head!;
    this.head = current.next;

    if (this.head === null) {
      this.tail = null;
    }

    this.queueSize--;
    return current.value;
  }

  peek(): Person | null {
    return this.head ? this.head.value : null;
  }

  size(): number {
    return this.queueSize;
  }

  isEmpty(): boolean {
    return this.queueSize === 0;
  }

  print(): Person[] {
    const result: Person[] = [];
    let current = this.head;

    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }

    return result.sort(
      (a, b) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime(),
    );
  }
}
