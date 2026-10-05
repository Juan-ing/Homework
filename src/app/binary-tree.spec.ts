import { BinaryTree } from './binary-tree';

describe('BinaryTree', () => {
  it('inserts values and returns each traversal order', () => {
    const tree = new BinaryTree();
    [8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((value) => tree.insert(value));

    expect(tree.preOrder(tree.root)).toEqual([8, 3, 1, 6, 4, 7, 10, 14, 13]);
    expect(tree.inOrder(tree.root)).toEqual([1, 3, 4, 6, 7, 8, 10, 13, 14]);
    expect(tree.postOrder(tree.root)).toEqual([1, 4, 7, 6, 3, 13, 14, 10, 8]);
  });

  it('searches values and identifies leaf nodes', () => {
    const tree = new BinaryTree();
    [8, 3, 10].forEach((value) => tree.insert(value));

    expect(tree.contains(10)).toBe(true);
    expect(tree.contains(5)).toBe(false);
    expect(tree.root?.left?.isLeaf()).toBe(true);
  });
});