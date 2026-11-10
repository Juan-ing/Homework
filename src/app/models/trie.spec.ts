import { Product } from './product';
import { Trie } from './trie';

describe('Trie', () => {
  let trie: Trie;
  const airMax: Product = { id: 1, name: 'air max', popularity: 90 };
  const airForce: Product = { id: 2, name: 'air force', popularity: 95 };
  const adidas: Product = { id: 3, name: 'adidas boost', popularity: 80 };

  beforeEach(() => {
    trie = new Trie();
    trie.insert(airMax);
    trie.insert(airForce);
    trie.insert(adidas);
  });

  it('finds exact products without treating a prefix as a complete word', () => {
    expect(trie.search('AIR MAX')).toBe(airMax);
    expect(trie.search('air')).toBeNull();
  });

  it('returns all products sharing a prefix and supports an empty prefix', () => {
    expect(trie.searchPrefix('air')).toEqual([airMax, airForce]);
    expect(trie.searchPrefix('')).toHaveLength(3);
    expect(trie.startsWith('adi')).toBe(true);
    expect(trie.startsWith('xyz')).toBe(false);
  });

  it('collects each stored product', () => {
    expect(trie.collectWords()).toHaveLength(3);
  });
});
