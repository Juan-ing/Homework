import { Graph, GraphNode } from './graph';

describe('Graph', () => {
  let graph: Graph<GraphNode>;

  beforeEach(() => {
    graph = new Graph<GraphNode>();
  });

  it('stores undirected edges in the adjacency list', () => {
    const city: GraphNode = { id: 'city-1', name: 'Cali', type: 'city' };
    const person: GraphNode = { id: 'person-1', name: 'Juan', type: 'person' };
    graph.addNode(city);
    graph.addNode(person);
    graph.addEdge(person, city);

    expect(graph.searchNode('city-1')).toEqual(city);
    expect(graph.printAdjacency(person)).toBe('Juan -> Cali');
    expect(graph.printAdjacency(city)).toBe('Cali -> Juan');
  });

  it('removes a node and its edges and recognizes an empty graph', () => {
    const city: GraphNode = { id: 'city-1', name: 'Cali', type: 'city' };
    const person: GraphNode = { id: 'person-1', name: 'Juan', type: 'person' };
    graph.addNode(city);
    graph.addNode(person);
    graph.addEdge(person, city);

    expect(graph.removeNode(person)).toBe(true);
    expect(graph.printAdjacency(city)).toBe('Cali -> (sin conexiones)');
    expect(graph.removeNode(person)).toBe(false);
    expect(graph.isEmpty()).toBe(false);
    expect(graph.print()).toContain('Cali');
    expect(graph.removeNode(city)).toBe(true);
    expect(graph.isEmpty()).toBe(true);
    expect(graph.print()).toBe('El grafo está vacío.');
  });
});
