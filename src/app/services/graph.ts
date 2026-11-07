import { Injectable, computed, signal } from '@angular/core';
import { City } from '../models/city';
import { Graph, GraphEdge, GraphNode } from '../models/graph';
import { Person } from '../models/person';

export interface GraphViewData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private readonly graph = new Graph<GraphNode>();
  private nextId = 1;
  private readonly citiesState = signal<City[]>([]);
  private readonly peopleState = signal<Person[]>([]);

  readonly cities = this.citiesState.asReadonly();
  readonly people = this.peopleState.asReadonly();
  readonly graphData = computed<GraphViewData>(() => ({
    nodes: [
      ...this.citiesState().map((city) => ({
        id: city.id,
        name: city.name,
        type: 'city' as const,
      })),
      ...this.peopleState().map((person) => ({
        id: person.id,
        name: person.name,
        type: 'person' as const,
      })),
    ],
    edges: this.peopleState().map((person) => ({
      source: person.id,
      target: person.cityId,
    })),
  }));

  constructor() {
    const cali = this.addCity('Cali')!;
    const bogota = this.addCity('Bogotá')!;
    const medellin = this.addCity('Medellín')!;
    const cartagena = this.addCity('Cartagena')!;

    this.addPerson('Juan', 22, cali.id);
    this.addPerson('María', 25, bogota.id);
    this.addPerson('Carlos', 30, medellin.id);
    this.addPerson('Laura', 21, cali.id);
    this.addPerson('Pedro', 28, cartagena.id);
  }

  addCity(name: string): City | null {
    const normalizedName = name.trim();
    const alreadyExists = this.citiesState().some(
      (city) => city.name.toLocaleLowerCase() === normalizedName.toLocaleLowerCase(),
    );

    if (!normalizedName || alreadyExists) {
      return null;
    }

    const city: City = { id: `city-${this.nextId++}`, name: normalizedName };
    this.graph.addNode({ ...city, type: 'city' });
    this.citiesState.update((cities) => [...cities, city]);
    return city;
  }

  addPerson(name: string, age: number, cityId: string): Person | null {
    const normalizedName = name.trim();
    const cityExists = this.citiesState().some((city) => city.id === cityId);

    if (!normalizedName || !Number.isInteger(age) || age < 0 || !cityExists) {
      return null;
    }

    const person: Person = {
      id: `person-${this.nextId++}`,
      name: normalizedName,
      age,
      cityId,
    };
    this.graph.addNode({ id: person.id, name: person.name, type: 'person' });
    this.graph.addEdge(person.id, cityId);
    this.peopleState.update((people) => [...people, person]);
    return person;
  }

  assignCity(personId: string, cityId: string): boolean {
    const person = this.peopleState().find((item) => item.id === personId);
    const cityExists = this.citiesState().some((city) => city.id === cityId);

    if (!person || !cityExists) {
      return false;
    }

    if (person.cityId !== cityId) {
      this.graph.removeNode(personId);
      this.graph.addNode({ id: person.id, name: person.name, type: 'person' });
      this.graph.addEdge(personId, cityId);
      this.peopleState.update((people) =>
        people.map((item) => (item.id === personId ? { ...item, cityId } : item)),
      );
    }

    return true;
  }

  searchCity(name: string): City | undefined {
    const normalizedName = name.trim().toLocaleLowerCase();
    return this.citiesState().find((city) => city.name.toLocaleLowerCase() === normalizedName);
  }

  searchPerson(name: string): Person | undefined {
    const normalizedName = name.trim().toLocaleLowerCase();
    return this.peopleState().find((person) => person.name.toLocaleLowerCase() === normalizedName);
  }

  peopleInCity(cityId: string): Person[] {
    return this.peopleState().filter((person) => person.cityId === cityId);
  }

  getCityName(cityId: string): string {
    return this.citiesState().find((city) => city.id === cityId)?.name ?? 'Ciudad desconocida';
  }

  getAdjacencyList(): string[] {
    return Array.from(this.graph.nodes.keys(), (nodeId) => this.graph.printAdjacency(nodeId));
  }

  printGraph(): string {
    return this.graph.print();
  }
}
