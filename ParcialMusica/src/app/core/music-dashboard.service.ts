import { Injectable } from '@angular/core';
import { DEMO_SONGS } from '../data/demo-songs';
import type { Song } from '../models/song.model';
import { Graph } from '../structures/graph';
import { MaxHeap } from '../structures/max-heap';
import { Trie } from '../structures/trie';

@Injectable({ providedIn: 'root' })
export class MusicDashboardService {
  readonly songs = DEMO_SONGS.map((song) => ({ ...song }));
  private readonly searchIndex = new Trie();
  private readonly popularity = new MaxHeap<Song>();
  private readonly relatedSongs = new Graph<Song>();

  constructor() {
    for (const song of this.songs) {
      this.searchIndex.insert(song.title);
      this.popularity.insert(song);
      this.relatedSongs.addNode(song);
    }

    for (let first = 0; first < this.songs.length; first += 1) {
      for (let second = first + 1; second < this.songs.length; second += 1) {
        const firstSong = this.songs[first];
        const secondSong = this.songs[second];
        if (firstSong.genre === secondSong.genre || firstSong.artist === secondSong.artist) {
          this.relatedSongs.addEdge(firstSong.id, secondSong.id);
        }
      }
    }
  }

  autocomplete(prefix: string): string[] {
    return this.searchIndex.autocomplete(prefix, 6);
  }

  hasExactTitle(title: string): boolean {
    return this.searchIndex.search(title);
  }

  search(prefix: string): Song[] {
    const titles = new Set(this.autocomplete(prefix).map((title) => title.toLocaleLowerCase()));
    return this.songs.filter((song) => titles.has(song.title.toLocaleLowerCase()));
  }

  getTopSongs(limit = 5): Song[] {
    return this.popularity.top(limit);
  }

  getMostPopular(): Song | undefined {
    return this.popularity.getMostPopular();
  }

  getRelatedSongs(songId: string, limit = 6): Song[] {
    return this.relatedSongs.recommendSimilar(songId, limit);
  }

  addSong(title: string, artist: string, genre: string): Song {
    const cleanTitle = title.trim();
    const cleanArtist = artist.trim();
    const cleanGenre = genre.trim();
    if (!cleanTitle || !cleanArtist || !cleanGenre) {
      throw new Error('Completa el nombre, el artista y el género.');
    }
    if (this.searchIndex.search(cleanTitle)) {
      throw new Error('Ya existe una canción con ese nombre.');
    }

    const song: Song = {
      id: this.createId(cleanArtist, cleanTitle),
      title: cleanTitle,
      artist: cleanArtist,
      genre: cleanGenre,
      album: 'Sencillo',
      duration: 180,
      plays: 0,
    };
    this.songs.unshift(song);
    this.searchIndex.insert(song.title);
    this.popularity.insert(song);
    this.relatedSongs.addNode(song);
    for (const related of this.songs) {
      if (
        related.id !== song.id &&
        (related.genre === song.genre || related.artist === song.artist)
      ) {
        this.relatedSongs.addEdge(song.id, related.id);
      }
    }
    return song;
  }

  recordPlay(song: Song): void {
    if (!this.popularity.updatePlays(song.id, song.plays + 1)) {
      throw new Error(`No se pudo actualizar la popularidad de "${song.title}".`);
    }
  }

  private createId(artist: string, title: string): string {
    const slug = `${artist}-${title}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return slug || `song-${Date.now()}`;
  }
}
