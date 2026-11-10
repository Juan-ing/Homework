import { Product } from './product';
import { TrieNode } from './trie-node';

export class Trie {
  readonly root = new TrieNode(null);

  insert(product: Product): void {
    let current = this.root;
    const word = this.normalize(product.name);

    for (const character of word) {
      let child = current.children.get(character);
      if (!child) {
        child = new TrieNode(character);
        current.children.set(character, child);
      }
      current = child;
    }

    current.isEndOfWord = true;
    current.product = product;
  }

  search(word: string): Product | null {
    const node = this.findNode(word);
    return node?.isEndOfWord ? node.product : null;
  }

  searchPrefix(prefix: string): Product[] {
    const node = this.findNode(prefix);
    if (!node) {
      return [];
    }

    const products: Product[] = [];
    this.collectFromNode(node, products);
    return products;
  }

  collectWords(): Product[] {
    const products: Product[] = [];
    this.collectFromNode(this.root, products);
    return products;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  private findNode(value: string): TrieNode | null {
    let current = this.root;

    for (const character of this.normalize(value)) {
      const child = current.children.get(character);
      if (!child) {
        return null;
      }
      current = child;
    }

    return current;
  }

  private collectFromNode(node: TrieNode, products: Product[]): void {
    if (node.isEndOfWord && node.product) {
      products.push(node.product);
    }

    for (const child of node.children.values()) {
      this.collectFromNode(child, products);
    }
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
}
