import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataEstructurtes } from './data-estructurtes';

describe('DataEstructurtes', () => {
  let component: DataEstructurtes;
  let fixture: ComponentFixture<DataEstructurtes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEstructurtes],
    }).compileComponents();

    fixture = TestBed.createComponent(DataEstructurtes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
