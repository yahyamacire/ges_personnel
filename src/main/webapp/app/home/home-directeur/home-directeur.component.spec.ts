import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDirecteurComponent } from './home-directeur.component';

describe('HomeDirecteurComponent', () => {
  let component: HomeDirecteurComponent;
  let fixture: ComponentFixture<HomeDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDirecteurComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
