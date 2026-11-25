interface TrieNode {
  children: Map<string, TrieNode>;
  word?: string;
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

export class Trie {
  private readonly root: TrieNode = { children: new Map() };

  insert(value: string): void {
    const word = value.trim();
    const normalized = normalize(word);
    if (!normalized) return;

    let node = this.root;
    for (const character of normalized) {
      let child = node.children.get(character);
      if (!child) {
        child = { children: new Map() };
        node.children.set(character, child);
      }
      node = child;
    }
    node.word = word;
  }

  search(value: string): boolean {
    return this.findNode(normalize(value.trim()))?.word !== undefined;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(normalize(prefix.trim())) !== undefined;
  }

  autocomplete(prefix: string, limit = 8): string[] {
    const node = this.findNode(normalize(prefix.trim()));
    if (!node || limit <= 0) return [];

    const matches: string[] = [];
    const visit = (current: TrieNode): void => {
      if (current.word) matches.push(current.word);
      if (matches.length >= limit) return;
      for (const child of current.children.values()) {
        visit(child);
        if (matches.length >= limit) return;
      }
    };
    visit(node);
    return matches;
  }

  private findNode(value: string): TrieNode | undefined {
    let node = this.root;
    for (const character of value) {
      const child = node.children.get(character);
      if (!child) return undefined;
      node = child;
    }
    return node;
  }
}
