import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMinistreComponent } from './home-ministre.component';

describe('HomeMinistreComponent', () => {
  let component: HomeMinistreComponent;
  let fixture: ComponentFixture<HomeMinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeMinistreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
