import type { FileSystemNode, FileSystemNodeType } from './file-system-node.model';

export class Node {
  readonly children: Node[] = [];

  constructor(
    public readonly id: string,
    public name: string,
    public readonly type: FileSystemNodeType,
  ) {}

  isLeaf(): boolean {
    return this.type === 'file';
  }

  addChild(node: Node): void {
    if (this.type !== 'folder') {
      throw new Error('Un archivo no puede tener hijos.');
    }
    if (node.isLeaf() && node.children.length > 0) {
      throw new Error('Un archivo no puede tener hijos.');
    }
    if (this.children.some((child) => child.id === node.id)) {
      throw new Error('Ya existe un hijo con ese identificador.');
    }
    this.children.push(node);
  }
}

export class NTree {
  readonly root = new Node('root', 'Mis archivos', 'folder');

  insert(parentId: string, newNode: Node): void {
    if (this.dfs().some((node) => node.id === newNode.id)) {
      throw new Error('Ya existe un nodo con ese identificador.');
    }
    const parent = this.dfs().find((node) => node.id === parentId);
    if (!parent) {
      throw new Error(`No se encontró la carpeta contenedora "${parentId}".`);
    }
    parent.addChild(newNode);
  }

  dfs(node: Node = this.root): Node[] {
    return [node, ...node.children.flatMap((child) => this.dfs(child))];
  }

  bfs(node: Node = this.root): Node[] {
    const result: Node[] = [];
    const queue: Node[] = [node];
    let index = 0;
    while (index < queue.length) {
      const current = queue[index++];
      if (current) {
        result.push(current);
        queue.push(...current.children);
      }
    }
    return result;
  }

  load(records: FileSystemNode[]): void {
    this.root.children.splice(0);
    const nodes = new Map<string, Node>();
    const recordsById = new Map<string, FileSystemNode>();
    for (const record of records) {
      if (record.id === this.root.id || nodes.has(record.id)) {
        throw new Error(`El identificador "${record.id}" está duplicado.`);
      }
      nodes.set(record.id, new Node(record.id, record.name, record.type));
      recordsById.set(record.id, record);
    }

    for (const record of records) {
      const chain = new Set<string>();
      let current: FileSystemNode | undefined = record;
      while (current) {
        if (chain.has(current.id)) {
          throw new Error('La estructura de carpetas contiene un ciclo.');
        }
        chain.add(current.id);
        if (current.parentId === null) {
          break;
        }
        current = recordsById.get(current.parentId);
        if (!current) {
          throw new Error(`No se encontró el padre del nodo "${record.name}".`);
        }
      }
    }

    for (const record of records) {
      const node = nodes.get(record.id);
      const parent = record.parentId === null ? this.root : nodes.get(record.parentId);
      if (!node || !parent) {
        throw new Error(`No se encontró el padre del nodo "${record.name}".`);
      }
      parent.addChild(node);
    }
  }
}
