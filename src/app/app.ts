import { Component, signal } from '@angular/core';
import { AtmQueue } from './atm-queue/atm-queue';
import { Person, Queue } from './queue';

@Component({
  standalone: true,
  imports: [AtmQueue],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly queue = new Queue();
  protected readonly people = signal<Person[]>([]);

  constructor() {
    this.loadInitialPeople();
  }

  private loadInitialPeople(): void {
    const initialPeople: Person[] = [
      { nombre: 'Ana', montoRetiro: 250000, fechaLlegada: new Date(Date.now() - 120000) },
      { nombre: 'Carlos', montoRetiro: 100000, fechaLlegada: new Date(Date.now() - 60000) },
      { nombre: 'Laura', montoRetiro: 50000, fechaLlegada: new Date(Date.now() - 30000) },
    ];

    initialPeople.forEach((person) => this.queue.enqueue(person));
    this.people.set(this.queue.print());
  }

  protected addPerson(person: Person): void {
    this.queue.enqueue(person);
    this.people.set(this.queue.print());
  }

  protected handlePersonAttended(person: Person | null): void {
    if (!person) {
      return;
    }

    const removed = this.queue.dequeue();

    if (removed) {
      this.people.set(this.queue.print());
    }
  }
}
