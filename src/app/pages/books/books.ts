import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { Stack } from '../../data-structures/stack';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class BooksComponent {
  readonly stack = new Stack<Book>();

  newBook: Book = {
    name: '',
    isbn: '',
    author: '',
    editorial: '',
  };

  statusMessage = 'Pila inicializada con libros de prueba.';

  constructor() {
    const mockBooks: Book[] = [
      {
        name: 'The Hobbit',
        isbn: '978-0547928227',
        author: 'J.R.R. Tolkien',
        editorial: 'Houghton Mifflin',
      },
      {
        name: 'Clean Code',
        isbn: '978-0132350884',
        author: 'Robert C. Martin',
        editorial: 'Prentice Hall',
      },
      {
        name: 'Don Quixote',
        isbn: '978-8420412146',
        author: 'Miguel de Cervantes',
        editorial: 'Editorial Planeta',
      },
      {
        name: 'The Pragmatic Programmer',
        isbn: '978-0201616224',
        author: 'Andrew Hunt',
        editorial: 'Addison-Wesley',
      },
    ];

    mockBooks.forEach((book) => this.stack.push(book));
  }

  get stackItems(): Book[] {
    return this.stack.print().slice().reverse();
  }

  get isStackEmpty(): boolean {
    return this.stack.isEmpty();
  }

  addBook(): void {
    const { name, isbn, author, editorial } = this.newBook;

    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) {
      this.statusMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.stack.push({
      name: name.trim(),
      isbn: isbn.trim(),
      author: author.trim(),
      editorial: editorial.trim(),
    });

    this.newBook = { name: '', isbn: '', author: '', editorial: '' };
    this.statusMessage = 'Libro agregado correctamente a la pila.';
  }

  popBook(): void {
    if (this.stack.isEmpty()) {
      this.statusMessage = 'La pila está vacía. No se puede hacer pop.';
      return;
    }

    const removedBook = this.stack.pop();
    this.statusMessage = removedBook
      ? `Se retiró: ${removedBook.name}`
      : 'La pila está vacía.';
  }

  peekBook(): void {
    if (this.stack.isEmpty()) {
      this.statusMessage = 'La pila está vacía. No hay libro en el TOP.';
      return;
    }

    const book = this.stack.peek();
    this.statusMessage = book
      ? `TOP: ${book.name} - Autor: ${book.author}`
      : 'La pila está vacía.';
  }
}
