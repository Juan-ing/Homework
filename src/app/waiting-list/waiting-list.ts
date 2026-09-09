import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../models/clinic-models';

@Component({
  selector: 'app-waiting-list',
  standalone: true,
  templateUrl: './waiting-list.html',
  styleUrl: './waiting-list.css',
})
export class WaitingList {
  @Input() patients: Patient[] = [];

  @Output() patientAttended = new EventEmitter<Patient>();

  attendPatient(patient: Patient): void {
    this.patientAttended.emit(patient);
  }
}
