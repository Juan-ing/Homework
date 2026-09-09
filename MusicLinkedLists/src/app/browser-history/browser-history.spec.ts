import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserHistoryComponent } from './browser-history';  

describe('BrowserHistoryComponent', () => {
  let component: BrowserHistoryComponent;
  let fixture: ComponentFixture<BrowserHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowserHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
