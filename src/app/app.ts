import { Component } from '@angular/core';
import { SearchEngine } from './components/search-engine/search-engine';

@Component({
  imports: [SearchEngine],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Challenge 12: Smart Search Engine';
}
