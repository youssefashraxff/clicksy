import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationLayout } from './authentication-layout';

describe('AuthenticationLayout', () => {
  let component: AuthenticationLayout;
  let fixture: ComponentFixture<AuthenticationLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
