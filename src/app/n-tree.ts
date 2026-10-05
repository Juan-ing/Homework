export class Node {
  readonly children: Node[] = [];

  constructor(public value: string) {}

  isLeaf(): boolean {
    return this.children.length === 0;
  }

  addChild(node: Node): void {
    this.children.push(node);
  }
}

export class NTree {
  readonly root: Node;

  constructor(rootValue: string) {
    this.root = new Node(rootValue);
  }

  insert(parentValue: string, newValue: string): boolean {
    const parent = this.find(parentValue);
    if (!parent) {
      return false;
    }

    parent.addChild(new Node(newValue));
    return true;
  }

  dfs(node: Node = this.root): Node[] {
    const result = [node];
    for (const child of node.children) {
      result.push(...this.dfs(child));
    }
    return result;
  }

  bfs(node: Node = this.root): Node[] {
    const result: Node[] = [];
    const queue = [node];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        result.push(current);
        queue.push(...current.children);
      }
    }

    return result;
  }

  find(value: string): Node | undefined {
    return this.bfs().find((node) => node.value === value);
  }
}