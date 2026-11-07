import { TestBed } from '@angular/core/testing';
import { GraphService } from './graph';

describe('GraphService', () => {
  let service: GraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphService);
  });

  it('loads the initial cities, people, and relationships', () => {
    expect(service).toBeTruthy();
    expect(service.cities().map((city) => city.name)).toEqual([
      'Cali',
      'Bogotá',
      'Medellín',
      'Cartagena',
    ]);
    expect(service.people()).toHaveLength(5);
    expect(service.peopleInCity(service.cities()[0].id).map((person) => person.name)).toEqual([
      'Juan',
      'Laura',
    ]);
    expect(service.graphData().edges).toHaveLength(5);
  });

  it('adds records and can reassign a person to another city', () => {
    const city = service.addCity('Pasto');
    expect(city).not.toBeNull();
    const person = service.addPerson('Ana', 20, city!.id);
    expect(person).not.toBeNull();

    const bogota = service.searchCity('Bogotá');
    expect(service.assignCity(person!.id, bogota!.id)).toBe(true);
    expect(service.peopleInCity(bogota!.id)).toContainEqual({ ...person!, cityId: bogota!.id });
    expect(service.graphData().edges.find((edge) => edge.source === person!.id)?.target).toBe(
      bogota!.id,
    );
  });
});
