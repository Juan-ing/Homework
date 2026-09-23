import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewPersonForm } from '../new-person-form/new-person-form';
import { Person } from '../queue';

@Component({
  standalone: true,
  selector: 'app-atm-queue',
  imports: [NewPersonForm, DatePipe],
  styleUrl: './atm-queue.css',
  templateUrl: './atm-queue.html',
})
export class AtmQueue {
  @Input() people: Person[] = [];
  @Output() personAdded = new EventEmitter<Person>();
  @Output() personAttended = new EventEmitter<Person | null>();

  protected nextPerson(): Person | null {
    return this.people[0] ?? null;
  }

  protected handlePersonAdded(person: Person): void {
    this.personAdded.emit(person);
  }

  protected attendPerson(): void {
    const person = this.nextPerson();
    this.personAttended.emit(person);
  }
}
