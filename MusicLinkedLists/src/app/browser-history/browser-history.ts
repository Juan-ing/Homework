import { Component } from '@angular/core';
import { DoublyLinkedList } from '../data-estructure/doubly-linked-list';

@Component({
  selector: 'app-browser-history',
  standalone: true,
  templateUrl: './browser-history.html'
})
export class BrowserHistoryComponent {

  history = new DoublyLinkedList<string>();

  constructor() {
    this.history.add('Google');
    this.history.add('YouTube');
    this.history.add('GitHub');
    this.history.add('Angular');
    this.history.add('Stack Overflow');
  }

  goBack(): void {
    this.history.goBack();
  }

  goForward(): void {
    this.history.goForward();
  }

  getCurrentPage(): string | null {
    return this.history.getCurrent();
  }

  get pages(): string[] {
    return this.history.toArray();
  }

  get canGoBack(): boolean {
    return this.history.canGoBack();
  }

  get canGoForward(): boolean {
    return this.history.canGoForward();
  }
}