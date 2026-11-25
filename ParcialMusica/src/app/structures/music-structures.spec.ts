import { describe, expect, it } from 'vitest';
import { MusicDashboardService } from '../core/music-dashboard.service';
import { Graph } from './graph';
import { MaxHeap } from './max-heap';
import { Trie } from './trie';

describe('Trie', () => {
  it('finds titles and returns accent-insensitive suggestions by prefix', () => {
    const trie = new Trie();
    trie.insert('Dákiti');
    trie.insert('Danza Kuduro');

    expect(trie.search('dAkItI')).toBe(true);
    expect(trie.startsWith('da')).toBe(true);
    expect(trie.autocomplete('DA')).toEqual(['Dákiti', 'Danza Kuduro']);
    expect(trie.search('dak')).toBe(false);
  });

  it('ignores blank values and respects the suggestion limit', () => {
    const trie = new Trie();
    trie.insert(' ');
    trie.insert('Billie Jean');
    trie.insert('Blinding Lights');

    expect(trie.autocomplete('b', 1)).toEqual(['Billie Jean']);
    expect(trie.autocomplete('missing')).toEqual([]);
  });
});

describe('MaxHeap', () => {
  it('keeps the most popular songs on top as play counts change', () => {
    const heap = new MaxHeap<{ id: string; title: string; plays: number }>();
    heap.insert({ id: 'one', title: 'One', plays: 10 });
    heap.insert({ id: 'two', title: 'Two', plays: 40 });
    heap.insert({ id: 'three', title: 'Three', plays: 30 });

    expect(heap.getMostPopular()?.id).toBe('two');
    expect(heap.updatePlays('two', 5)).toBe(true);
    expect(heap.top(3).map((song) => song.id)).toEqual(['three', 'one', 'two']);
    expect(heap.updatePlays('two', 50)).toBe(true);
    expect(heap.getMostPopular()?.id).toBe('two');
    expect(heap.updatePlays('missing', 1)).toBe(false);
  });

  it('rejects invalid counts and limits the returned ranking', () => {
    const heap = new MaxHeap<{ id: string; plays: number }>();
    heap.insert({ id: 'one', plays: 7 });
    heap.insert({ id: 'two', plays: 9 });

    expect(heap.top(1).map((song) => song.id)).toEqual(['two']);
    expect(() => heap.updatePlays('one', -1)).toThrow(RangeError);
  });
});

describe('Graph', () => {
  it('creates undirected relations and returns related nodes', () => {
    const graph = new Graph<{ id: string }>();
    graph.addNode({ id: 'a' });
    graph.addNode({ id: 'b' });
    graph.addNode({ id: 'c' });
    graph.addEdge('a', 'b');
    graph.addEdge('a', 'a');
    graph.addEdge('a', 'missing');

    expect(graph.getNeighbors('a').map((node) => node.id)).toEqual(['b']);
    expect(graph.getNeighbors('b').map((node) => node.id)).toEqual(['a']);
    expect(graph.recommendSimilar('a', 0)).toEqual([]);
  });
});

describe('MusicDashboardService', () => {
  it('indexes the catalog and links added songs into the same-genre graph', () => {
    const music = new MusicDashboardService();
    const added = music.addSong('Aurora Nueva', 'Artista Demo', 'Jazz');

    expect(music.hasExactTitle('aurora nueva')).toBe(true);
    expect(music.autocomplete('AUR')).toContain('Aurora Nueva');
    expect(music.getRelatedSongs(added.id).some((song) => song.genre === 'Jazz')).toBe(true);
    expect(() => music.addSong('Aurora Nueva', 'Otro artista', 'Jazz')).toThrow('Ya existe');
  });
});
