import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProducts } from './category-products/category-products';

describe('CategoryProducts', () => {
  let component: CategoryProducts;
  let fixture: ComponentFixture<CategoryProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
