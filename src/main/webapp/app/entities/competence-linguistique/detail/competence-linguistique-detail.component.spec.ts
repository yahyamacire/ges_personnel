import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CompetenceLinguistiqueDetailComponent } from './competence-linguistique-detail.component';

describe('CompetenceLinguistique Management Detail Component', () => {
  let comp: CompetenceLinguistiqueDetailComponent;
  let fixture: ComponentFixture<CompetenceLinguistiqueDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenceLinguistiqueDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ competenceLinguistique: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CompetenceLinguistiqueDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CompetenceLinguistiqueDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load competenceLinguistique on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.competenceLinguistique).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
