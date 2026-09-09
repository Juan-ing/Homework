import { Component, Input } from '@angular/core';
import { Patient } from '../models/clinic-models';

@Component({
  selector: 'app-history-list',
  standalone: true,
  templateUrl: './history-list.html',
  styleUrl: './history-list.css',
})
export class HistoryList {
  @Input() patients: Patient[] = [];
}
