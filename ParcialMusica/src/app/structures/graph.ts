export class Graph<T extends { id: string }> {
  private readonly nodes = new Map<string, T>();
  private readonly edges = new Map<string, Set<string>>();

  addNode(node: T): void {
    this.nodes.set(node.id, node);
    if (!this.edges.has(node.id)) this.edges.set(node.id, new Set());
  }

  addEdge(sourceId: string, targetId: string): void {
    if (!this.nodes.has(sourceId) || !this.nodes.has(targetId) || sourceId === targetId) return;
    this.edges.get(sourceId)?.add(targetId);
    this.edges.get(targetId)?.add(sourceId);
  }

  getNeighbors(id: string): T[] {
    return Array.from(this.edges.get(id) ?? [])
      .map((neighborId) => this.nodes.get(neighborId))
      .filter((node): node is T => node !== undefined);
  }

  recommendSimilar(id: string, limit = 5): T[] {
    return this.getNeighbors(id).slice(0, Math.max(0, limit));
  }
}
