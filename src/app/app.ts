import { Component } from '@angular/core';
import { BooksComponent } from './pages/books/books';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BooksComponent],
  template: '<app-books></app-books>',
})
export class App {}
