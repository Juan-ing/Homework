import { describe, expect, it } from 'vitest';
import { NTree, Node } from './n-tree';

describe('NTree', () => {
  it('inserts children and reports leaf nodes', () => {
    const tree = new NTree('Inicio');

    expect(tree.insert('Inicio', 'Productos')).toBe(true);
    expect(tree.insert('Productos', 'Libros')).toBe(true);
    expect(tree.insert('Ausente', 'Otro')).toBe(false);
    expect(tree.root.isLeaf()).toBe(false);
    expect(tree.find('Libros')?.isLeaf()).toBe(true);
    expect(new Node('Vacío').isLeaf()).toBe(true);
  });

  it('returns depth-first and breadth-first traversal orders', () => {
    const tree = new NTree('Inicio');
    tree.insert('Inicio', 'Productos');
    tree.insert('Inicio', 'Servicios');
    tree.insert('Productos', 'Libros');

    expect(tree.dfs().map((node) => node.value)).toEqual([
      'Inicio',
      'Productos',
      'Libros',
      'Servicios',
    ]);
    expect(tree.bfs().map((node) => node.value)).toEqual([
      'Inicio',
      'Productos',
      'Servicios',
      'Libros',
    ]);
  });
});
