import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestHome } from './guest-home';

describe('GuestHome', () => {
  let component: GuestHome;
  let fixture: ComponentFixture<GuestHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
