export default class Contacto {
  private static siguienteId = 0;
  id: number;
  nombre: string;
  numero: string;

  constructor(nombre: string, numero: string) {
    this.id = Contacto.siguienteId++;
    this.nombre = nombre;
    this.numero = numero;
  }
}