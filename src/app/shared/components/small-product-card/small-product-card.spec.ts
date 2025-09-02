import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallProductCard } from './small-product-card';

describe('SmallProductCard', () => {
  let component: SmallProductCard;
  let fixture: ComponentFixture<SmallProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallProductCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallProductCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
