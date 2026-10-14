import { describe, expect, it } from 'vitest';
import { NTree, Node } from './n-tree';

describe('NTree', () => {
  it('inserts and traverses folder and file nodes in DFS and BFS order', () => {
    const tree = new NTree();
    tree.insert('root', new Node('folder-1', 'Documentos', 'folder'));
    tree.insert('folder-1', new Node('file-1', 'notas.txt', 'file'));
    tree.insert('root', new Node('file-2', 'readme.txt', 'file'));

    expect(tree.dfs().map((node) => node.id)).toEqual(['root', 'folder-1', 'file-1', 'file-2']);
    expect(tree.bfs().map((node) => node.id)).toEqual(['root', 'folder-1', 'file-2', 'file-1']);
  });

  it('does not allow files to contain children', () => {
    const file = new Node('file-1', 'notas.txt', 'file');

    expect(file.isLeaf()).toBe(true);
    expect(() => file.addChild(new Node('child', 'hijo', 'file'))).toThrow(
      'Un archivo no puede tener hijos.',
    );
    expect(() => file.addChild(new Node('folder-child', 'hijo', 'folder'))).toThrow(
      'Un archivo no puede tener hijos.',
    );
  });

  it('reconstructs a tree from unordered Firestore records', () => {
    const tree = new NTree();
    tree.load([
      {
        id: 'file-1',
        name: 'notas.txt',
        type: 'file',
        parentId: 'folder-1',
        creatorEmail: 'ana@example.com',
      },
      {
        id: 'folder-1',
        name: 'Documentos',
        type: 'folder',
        parentId: null,
        creatorEmail: 'ana@example.com',
      },
    ]);

    expect(tree.root.children[0]?.children[0]?.name).toBe('notas.txt');
  });

  it('rejects malformed parent references and cycles when loading records', () => {
    const tree = new NTree();
    const record = (id: string, parentId: string) => ({
      id,
      name: id,
      type: 'folder' as const,
      parentId,
      creatorEmail: 'ana@example.com',
    });

    expect(() => tree.load([record('orphan', 'missing')])).toThrow('No se encontró el padre');
    expect(() =>
      tree.load([record('folder-1', 'folder-2'), record('folder-2', 'folder-1')]),
    ).toThrow('contiene un ciclo');
  });

  it('rejects inserting a child under a file', () => {
    const tree = new NTree();
    tree.insert('root', new Node('file-1', 'notas.txt', 'file'));

    expect(() => tree.insert('file-1', new Node('file-2', 'otro.txt', 'file'))).toThrow(
      'Un archivo no puede tener hijos.',
    );
  });
});
