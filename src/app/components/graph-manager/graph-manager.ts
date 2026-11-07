import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphService } from '../../services/graph';

@Component({
  imports: [FormsModule],
  selector: 'app-graph-manager',
  styleUrl: './graph-manager.css',
  templateUrl: './graph-manager.html',
})
export class GraphManager {
  protected readonly graphService = inject(GraphService);
  protected readonly cities = this.graphService.cities;
  protected readonly people = this.graphService.people;

  protected cityName = '';
  protected personName = '';
  protected personAge: number | null = null;
  protected personCityId = this.graphService.cities()[0]?.id ?? '';
  protected selectedPersonId = '';
  protected reassignedCityId = this.personCityId;
  protected message = '';
  protected messageType: 'success' | 'error' = 'success';

  protected addCity(): void {
    const city = this.graphService.addCity(this.cityName);

    if (!city) {
      this.showMessage('Escribe un nombre nuevo para la ciudad.', 'error');
      return;
    }

    this.cityName = '';
    this.personCityId ||= city.id;
    this.reassignedCityId ||= city.id;
    this.showMessage(`La ciudad ${city.name} fue agregada.`, 'success');
  }

  protected addPerson(): void {
    if (this.personAge === null) {
      this.showMessage('Ingresa una edad válida.', 'error');
      return;
    }

    const person = this.graphService.addPerson(
      this.personName,
      this.personAge,
      this.personCityId,
    );

    if (!person) {
      this.showMessage('Verifica el nombre, la edad y la ciudad seleccionada.', 'error');
      return;
    }

    this.personName = '';
    this.personAge = null;
    this.showMessage(
      `${person.name} fue agregado a ${this.graphService.getCityName(person.cityId)}.`,
      'success',
    );
  }

  protected assignCity(): void {
    if (!this.selectedPersonId || !this.reassignedCityId) {
      this.showMessage('Selecciona una persona y una ciudad.', 'error');
      return;
    }

    const person = this.people().find((item) => item.id === this.selectedPersonId);
    const assigned = this.graphService.assignCity(this.selectedPersonId, this.reassignedCityId);

    if (!assigned || !person) {
      this.showMessage('No fue posible asignar la ciudad seleccionada.', 'error');
      return;
    }

    this.showMessage(
      `${person.name} ahora vive en ${this.graphService.getCityName(this.reassignedCityId)}.`,
      'success',
    );
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
  }
}
