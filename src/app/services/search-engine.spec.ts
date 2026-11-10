import { TestBed } from '@angular/core/testing';
import { SearchEngineService } from './search-engine';

describe('SearchEngineService', () => {
  let service: SearchEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('preloads all fifteen required products', () => {
    const products = service.getProducts();
    expect(products).toHaveLength(15);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'air max', popularity: 90 }),
        expect.objectContaining({ name: 'air force', popularity: 95 }),
        expect.objectContaining({ name: 'air jordan', popularity: 85 }),
        expect.objectContaining({ name: 'air trainer', popularity: 83 }),
        expect.objectContaining({ name: 'adidas boost', popularity: 80 }),
        expect.objectContaining({ name: 'adidas forum', popularity: 75 }),
        expect.objectContaining({ name: 'adidas superstar', popularity: 88 }),
        expect.objectContaining({ name: 'adidas samba', popularity: 92 }),
        expect.objectContaining({ name: 'puma future', popularity: 82 }),
        expect.objectContaining({ name: 'puma runner', popularity: 70 }),
        expect.objectContaining({ name: 'new balance 550', popularity: 78 }),
        expect.objectContaining({ name: 'new balance 9060', popularity: 87 }),
        expect.objectContaining({ name: 'asics gel', popularity: 84 }),
        expect.objectContaining({ name: 'asics kayano', popularity: 89 }),
        expect.objectContaining({ name: 'reebok classic', popularity: 77 }),
      ]),
    );
  });

  it('returns the top K matching products by popularity', () => {
    expect(service.searchTopK('air', 2).map((product) => product.name)).toEqual([
      'air force',
      'air max',
    ]);
  });

  it('adds products and reflects their popularity changes in new searches', () => {
    const added = service.addProduct('Air Pegasus', 91);
    expect(added.success).toBe(true);

    if (!added.success) {
      return;
    }

    expect(service.adjustPopularity(added.product.id, 5)).toBe(true);
    expect(service.searchTopK('air pe', 1)[0].popularity).toBe(96);
  });

  it('reports invalid and duplicate products', () => {
    expect(service.addProduct(' ', 20).success).toBe(false);
    expect(service.addProduct('AIR MAX', 20).success).toBe(false);
  });
});
