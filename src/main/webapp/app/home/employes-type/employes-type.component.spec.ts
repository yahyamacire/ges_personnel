import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesTypeComponent } from './employes-type.component';

describe('EmployesTypeComponent', () => {
  let component: EmployesTypeComponent;
  let fixture: ComponentFixture<EmployesTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployesTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
