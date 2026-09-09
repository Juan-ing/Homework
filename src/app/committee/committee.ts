import { Component, Input } from '@angular/core';
import { CommitteeMember } from '../models/clinic-models';

@Component({
  selector: 'app-committee',
  standalone: true,
  templateUrl: './committee.html',
  styleUrl: './committee.css',
})
export class Committee {
  @Input() members: CommitteeMember[] = [];
}
