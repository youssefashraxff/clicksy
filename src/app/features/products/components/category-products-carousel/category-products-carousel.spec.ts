import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsCarousel } from './category-products-carousel';

describe('CategoryProductsCarousel', () => {
  let component: CategoryProductsCarousel;
  let fixture: ComponentFixture<CategoryProductsCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryProductsCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryProductsCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
