import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Contacto from './models/contacto';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected contactos: Contacto[] = [
    new Contacto('Juan', '123456789'),
    new Contacto('Maria', '987654321'),
    new Contacto('Pedro', '555555555'),
  ];

  protected nombre = '';
  protected numero = '';

  protected agregarContacto(): void {
    if (!this.nombre.trim() || !this.numero.trim()) {
      return;
    }

    this.contactos.push(new Contacto(this.nombre.trim(), this.numero.trim()));
    this.nombre = '';
    this.numero = '';
  }

  protected borrarUltimoContacto(): void {
    this.contactos.pop();
  }
}
