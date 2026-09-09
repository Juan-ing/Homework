import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Committee } from './committee/committee';
import { DoctorsRotation } from './doctors-rotation/doctors-rotation';
import { HistoryList } from './history-list/history-list';
import { WaitingList } from './waiting-list/waiting-list';
import { CircularDoublyLinkedList } from './models/circular-double-linked-list';
import { CircularLinkedList } from './models/circular-linked-list';
import { CommitteeMember, Patient } from './models/clinic-models';
import { DoublyLinkedList } from './models/double-linked-list';
import { LinkedList } from './models/simple-linked-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, WaitingList, HistoryList, DoctorsRotation, Committee],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Clínica UAO');
  readonly activeSection = signal<'waiting-list' | 'history-list' | 'doctors-rotation' | 'committee'>('waiting-list');

  waitingPatients = new LinkedList<Patient>();
  attendedHistory = new DoublyLinkedList<Patient>();
  doctors = new CircularLinkedList<string>();
  committee = new CircularDoublyLinkedList<CommitteeMember>();

  constructor() {
    this.waitingPatients.add({ id: 1, name: 'Ana García', complaint: 'Dolor de cabeza' });
    this.waitingPatients.add({ id: 2, name: 'Luis Pérez', complaint: 'Fiebre' });
    this.waitingPatients.add({ id: 3, name: 'Sofía López', complaint: 'Control de presión' });

    this.attendedHistory.add({ id: 10, name: 'Carlos Ruiz', complaint: 'Consulta general' });
    this.attendedHistory.add({ id: 11, name: 'María Torres', complaint: 'Revisión' });

    this.doctors.add('Dr. Ramírez');
    this.doctors.add('Dra. Mendoza');
    this.doctors.add('Dr. Silva');

    this.committee.add({ name: 'Dr. Gómez', role: 'Presidente' });
    this.committee.add({ name: 'Dra. Castro', role: 'Secretaria' });
    this.committee.add({ name: 'Ing. Paredes', role: 'Administración' });
  }

  changeSection(section: 'waiting-list' | 'history-list' | 'doctors-rotation' | 'committee'): void {
    this.activeSection.set(section);
  }

  onPatientAttended(patient: Patient): void {
    this.waitingPatients.removeByValue(patient);
    this.attendedHistory.add(patient);
  }
}
