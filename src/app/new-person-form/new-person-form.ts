import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../queue';

@Component({
  standalone: true,
  selector: 'app-new-person-form',
  imports: [FormsModule],
  styleUrl: './new-person-form.css',
  templateUrl: './new-person-form.html',
})
export class NewPersonForm {
  @Output() personAdded = new EventEmitter<Person>();

  protected nombre = '';
  protected montoRetiro = 0;

  protected submitForm(): void {
    const name = this.nombre.trim();

    if (!name || this.montoRetiro <= 0) {
      return;
    }

    const person: Person = {
      nombre: name,
      montoRetiro: this.montoRetiro,
      fechaLlegada: new Date(),
    };

    this.personAdded.emit(person);
    this.nombre = '';
    this.montoRetiro = 0;
  }
}
