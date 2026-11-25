import { CommonModule } from '@angular/common';
import { Component, signal, type WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicDashboardService } from './core/music-dashboard.service';
import type { Song } from './models/song.model';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  readonly selectedSong: WritableSignal<Song>;
  query = '';
  newTitle = '';
  newArtist = '';
  newGenre = '';
  statusMessage = '';
  errorMessage = '';

  readonly today = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  constructor(readonly music: MusicDashboardService) {
    this.selectedSong = signal(music.songs[0]);
  }

  get suggestions(): string[] {
    return this.query.trim() ? this.music.autocomplete(this.query) : [];
  }

  get searchResults(): Song[] {
    return this.query.trim() ? this.music.search(this.query) : this.music.songs;
  }

  get exactMatch(): boolean {
    return this.query.trim().length > 0 && this.music.hasExactTitle(this.query);
  }

  get topSongs(): Song[] {
    return this.music.getTopSongs(5);
  }

  get genreCount(): number {
    return new Set(this.music.songs.map((song) => song.genre)).size;
  }

  get networkNodes(): Array<{ song: Song; x: number; y: number }> {
    const related = this.music.getRelatedSongs(this.selectedSong().id, 6);
    return related.map((song, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / Math.max(related.length, 1);
      return {
        song,
        x: 212 + Math.cos(angle) * 126,
        y: 142 + Math.sin(angle) * 88,
      };
    });
  }

  playSong(song: Song): void {
    this.music.recordPlay(song);
    this.selectedSong.set(song);
    this.errorMessage = '';
    this.statusMessage = `Reproduciendo ${song.title} · ${song.artist}`;
  }

  selectSong(song: Song): void {
    this.selectedSong.set(song);
    this.statusMessage = `${song.title} seleccionada para explorar sus conexiones.`;
    this.errorMessage = '';
  }

  chooseSuggestion(title: string): void {
    this.query = title;
    const song = this.music.search(title)[0];
    if (song) this.selectSong(song);
  }

  addSong(): void {
    this.statusMessage = '';
    this.errorMessage = '';
    try {
      const song = this.music.addSong(this.newTitle, this.newArtist, this.newGenre);
      this.selectedSong.set(song);
      this.query = song.title;
      this.newTitle = '';
      this.newArtist = '';
      this.newGenre = '';
      this.statusMessage = `${song.title} ya está en el Trie, el Max Heap y el grafo.`;
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'No se pudo agregar la canción.';
    }
  }

  formatPlays(plays: number): string {
    return new Intl.NumberFormat('es-CO', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(plays);
  }

  formatDuration(seconds: number): string {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  coverGradient(song: Song): string {
    const palettes: Record<string, string> = {
      Reguetón: 'linear-gradient(145deg, #ff8767, #a33878 60%, #402d6e)',
      Pop: 'linear-gradient(145deg, #ffb765, #ee709d 58%, #7441a6)',
      Rock: 'linear-gradient(145deg, #f8a35d, #9e4d44 58%, #2f314a)',
      Electrónica: 'linear-gradient(145deg, #67e4d2, #426bd0 58%, #462b7e)',
      Jazz: 'linear-gradient(145deg, #f8d575, #ba754b 58%, #493d67)',
    };
    return palettes[song.genre] ?? 'linear-gradient(145deg, #70d7cf, #5663bd 58%, #342b59)';
  }
}
