import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStructureComponent } from './detail-structure.component';

describe('DetailStructureComponent', () => {
  let component: DetailStructureComponent;
  let fixture: ComponentFixture<DetailStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailStructureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
