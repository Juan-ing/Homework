import { Component } from '@angular/core';
import { LinkedList } from '../../data-estructure/linked-list';

@Component({
  selector: 'app-songs',
  standalone: true,
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})
export class SongsComponent {

  songs = new LinkedList<string>();

  currentIndex = 0;

  constructor() {
    this.songs.add('Blinding Lights - The Weeknd');
    this.songs.add('Bohemian Rhapsody - Queen');
    this.songs.add('505 - Arctic Monkeys');
    this.songs.add('Sweet Child O Mine - Guns N Roses');
    this.songs.add('Hotel California - Eagles');
  }

  nextSong(): void {
    if (this.currentIndex < this.songs.getSize() - 1) {
      this.currentIndex++;
    }
  }

  previousSong(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  getCurrentSong(): string | null {
    return this.songs.get(this.currentIndex);
  }

  get songList(): string[] {
    return this.songs.toArray();
  }
}