import { Product } from './product';

export class TrieNode {
  readonly children = new Map<string, TrieNode>();
  isEndOfWord = false;
  product: Product | null = null;

  constructor(readonly value: string | null) {}
}
