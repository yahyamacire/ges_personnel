import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProjetService } from '../service/projet.service';

import { ProjetComponent } from './projet.component';

describe('Projet Management Component', () => {
  let comp: ProjetComponent;
  let fixture: ComponentFixture<ProjetComponent>;
  let service: ProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProjetComponent],
    })
      .overrideTemplate(ProjetComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProjetComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProjetService);

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
    expect(comp.projets?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
