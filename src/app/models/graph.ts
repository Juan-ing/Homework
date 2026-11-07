export interface GraphNode {
  id: string;
  name: string;
  type: 'city' | 'person';
}

export interface GraphEdge {
  source: string;
  target: string;
}

export class Graph<T extends GraphNode> {
  readonly nodes = new Map<string, T>();
  readonly adjacencyList = new Map<string, Set<string>>();

  addNode(node: T): void {
    if (this.nodes.has(node.id)) {
      throw new Error(`El nodo "${node.id}" ya existe.`);
    }

    this.nodes.set(node.id, node);
    this.adjacencyList.set(node.id, new Set<string>());
  }

  addEdge(source: string | T, destination: string | T): void {
    const sourceId = this.getNodeId(source);
    const destinationId = this.getNodeId(destination);
    const sourceNeighbors = this.adjacencyList.get(sourceId);
    const destinationNeighbors = this.adjacencyList.get(destinationId);

    if (!sourceNeighbors || !destinationNeighbors) {
      throw new Error('No se puede crear una arista con nodos inexistentes.');
    }

    sourceNeighbors.add(destinationId);
    destinationNeighbors.add(sourceId);
  }

  searchNode(node: string | T): T | undefined {
    return this.nodes.get(this.getNodeId(node));
  }

  printAdjacency(node: string | T): string {
    const id = this.getNodeId(node);
    const currentNode = this.nodes.get(id);
    const neighbors = this.adjacencyList.get(id);

    if (!currentNode || !neighbors) {
      return 'Nodo no encontrado.';
    }

    const names = Array.from(neighbors, (neighborId) => this.nodes.get(neighborId)?.name ?? neighborId);
    return `${currentNode.name} -> ${names.length > 0 ? names.join(', ') : '(sin conexiones)'}`;
  }

  removeNode(node: string | T): boolean {
    const id = this.getNodeId(node);
    const neighbors = this.adjacencyList.get(id);

    if (!neighbors) {
      return false;
    }

    for (const neighborId of neighbors) {
      this.adjacencyList.get(neighborId)?.delete(id);
    }

    this.adjacencyList.delete(id);
    this.nodes.delete(id);
    return true;
  }

  isEmpty(): boolean {
    return this.nodes.size === 0;
  }

  print(): string {
    if (this.isEmpty()) {
      return 'El grafo está vacío.';
    }

    return Array.from(this.nodes.keys(), (id) => this.printAdjacency(id)).join('\n');
  }

  private getNodeId(node: string | T): string {
    return typeof node === 'string' ? node : node.id;
  }
}
