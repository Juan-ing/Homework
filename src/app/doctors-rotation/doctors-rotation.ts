import { Component, signal, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CircularLinkedList } from '../models/circular-linked-list';

@Component({
  selector: 'app-doctors-rotation',
  standalone: true,
  templateUrl: './doctors-rotation.html',
  styleUrl: './doctors-rotation.css',
})
export class DoctorsRotation implements OnInit, OnDestroy {
  doctors = new CircularLinkedList<string>();
  currentDoctor = signal<string>('Dr. Ramírez');
  private intervalId: number | null = null;
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.doctors.add('Dr. Ramírez');
    this.doctors.add('Dra. Mendoza');
    this.doctors.add('Dr. Silva');

    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = window.setInterval(() => {
        const doctors = this.doctors.toArray();
        const currentIndex = doctors.indexOf(this.currentDoctor());
        const nextIndex = (currentIndex + 1) % doctors.length;
        this.currentDoctor.set(doctors[nextIndex]);
      }, 10000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null && isPlatformBrowser(this.platformId)) {
      window.clearInterval(this.intervalId);
    }
  }
}
