import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CompetenceLinguistiqueService } from '../service/competence-linguistique.service';

import { CompetenceLinguistiqueComponent } from './competence-linguistique.component';

describe('CompetenceLinguistique Management Component', () => {
  let comp: CompetenceLinguistiqueComponent;
  let fixture: ComponentFixture<CompetenceLinguistiqueComponent>;
  let service: CompetenceLinguistiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CompetenceLinguistiqueComponent],
    })
      .overrideTemplate(CompetenceLinguistiqueComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompetenceLinguistiqueComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CompetenceLinguistiqueService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.competenceLinguistiques?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
