import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Encuentra tu próximo sonido.');
    expect(compiled.querySelector('#popular')).toBeTruthy();
    expect(compiled.querySelector('#recommendations')).toBeTruthy();
  });

  it('should show Trie suggestions as the search term changes', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const search = fixture.nativeElement.querySelector(
      'input[aria-label="Buscar canciones por nombre"]',
    ) as HTMLInputElement;

    search.value = 'billi';
    search.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.suggestion-popover')?.textContent).toContain(
      'Billie Jean',
    );
    expect(fixture.nativeElement.querySelectorAll('.song-title-button')).toHaveLength(1);
  });
});
