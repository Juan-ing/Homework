import { Component } from '@angular/core';
import { GraphManager } from './components/graph-manager/graph-manager';
import { GraphView } from './components/graph-view/graph-view';

@Component({
  imports: [GraphManager, GraphView],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Challenge 11: Graphs';
}
