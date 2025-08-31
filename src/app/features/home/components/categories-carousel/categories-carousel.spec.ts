import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCarousel } from './categories-carousel';

describe('CategoriesCarousel', () => {
  let component: CategoriesCarousel;
  let fixture: ComponentFixture<CategoriesCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
