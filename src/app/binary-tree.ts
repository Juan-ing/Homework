export class Node {
  left: Node | null = null;
  right: Node | null = null;

  constructor(public value: number) {}

  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }
}

export class BinaryTree {
  constructor(public root: Node | null = null) {}

  insert(value: number): void {
    if (!Number.isFinite(value)) {
      return;
    }

    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let current: Node = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  preOrder(node: Node | null): number[] {
    if (node === null) {
      return [];
    }
    return [node.value, ...this.preOrder(node.left), ...this.preOrder(node.right)];
  }

  inOrder(node: Node | null): number[] {
    if (node === null) {
      return [];
    }
    return [...this.inOrder(node.left), node.value, ...this.inOrder(node.right)];
  }

  postOrder(node: Node | null): number[] {
    if (node === null) {
      return [];
    }
    return [...this.postOrder(node.left), ...this.postOrder(node.right), node.value];
  }

  contains(value: number): boolean {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) {
        return true;
      }
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }
}