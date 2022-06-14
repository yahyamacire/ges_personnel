import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CompetenceLinguistiqueService } from '../service/competence-linguistique.service';
import { ICompetenceLinguistique, CompetenceLinguistique } from '../competence-linguistique.model';
import { IEmploye } from 'app/entities/employe/employe.model';
import { EmployeService } from 'app/entities/employe/service/employe.service';
import { ILangue } from 'app/entities/langue/langue.model';
import { LangueService } from 'app/entities/langue/service/langue.service';

import { CompetenceLinguistiqueUpdateComponent } from './competence-linguistique-update.component';

describe('CompetenceLinguistique Management Update Component', () => {
  let comp: CompetenceLinguistiqueUpdateComponent;
  let fixture: ComponentFixture<CompetenceLinguistiqueUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let competenceLinguistiqueService: CompetenceLinguistiqueService;
  let employeService: EmployeService;
  let langueService: LangueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CompetenceLinguistiqueUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CompetenceLinguistiqueUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompetenceLinguistiqueUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    competenceLinguistiqueService = TestBed.inject(CompetenceLinguistiqueService);
    employeService = TestBed.inject(EmployeService);
    langueService = TestBed.inject(LangueService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Employe query and add missing value', () => {
      const competenceLinguistique: ICompetenceLinguistique = { id: 456 };
      const employe: IEmploye = { id: 40031 };
      competenceLinguistique.employe = employe;

      const employeCollection: IEmploye[] = [{ id: 54555 }];
      jest.spyOn(employeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeCollection })));
      const additionalEmployes = [employe];
      const expectedCollection: IEmploye[] = [...additionalEmployes, ...employeCollection];
      jest.spyOn(employeService, 'addEmployeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ competenceLinguistique });
      comp.ngOnInit();

      expect(employeService.query).toHaveBeenCalled();
      expect(employeService.addEmployeToCollectionIfMissing).toHaveBeenCalledWith(employeCollection, ...additionalEmployes);
      expect(comp.employesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Langue query and add missing value', () => {
      const competenceLinguistique: ICompetenceLinguistique = { id: 456 };
      const langue: ILangue = { id: 63977 };
      competenceLinguistique.langue = langue;

      const langueCollection: ILangue[] = [{ id: 98291 }];
      jest.spyOn(langueService, 'query').mockReturnValue(of(new HttpResponse({ body: langueCollection })));
      const additionalLangues = [langue];
      const expectedCollection: ILangue[] = [...additionalLangues, ...langueCollection];
      jest.spyOn(langueService, 'addLangueToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ competenceLinguistique });
      comp.ngOnInit();

      expect(langueService.query).toHaveBeenCalled();
      expect(langueService.addLangueToCollectionIfMissing).toHaveBeenCalledWith(langueCollection, ...additionalLangues);
      expect(comp.languesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const competenceLinguistique: ICompetenceLinguistique = { id: 456 };
      const employe: IEmploye = { id: 28247 };
      competenceLinguistique.employe = employe;
      const langue: ILangue = { id: 82229 };
      competenceLinguistique.langue = langue;

      activatedRoute.data = of({ competenceLinguistique });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(competenceLinguistique));
      expect(comp.employesSharedCollection).toContain(employe);
      expect(comp.languesSharedCollection).toContain(langue);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CompetenceLinguistique>>();
      const competenceLinguistique = { id: 123 };
      jest.spyOn(competenceLinguistiqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ competenceLinguistique });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: competenceLinguistique }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(competenceLinguistiqueService.update).toHaveBeenCalledWith(competenceLinguistique);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CompetenceLinguistique>>();
      const competenceLinguistique = new CompetenceLinguistique();
      jest.spyOn(competenceLinguistiqueService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ competenceLinguistique });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: competenceLinguistique }));
      saveSubject.complete();

      // THEN
      expect(competenceLinguistiqueService.create).toHaveBeenCalledWith(competenceLinguistique);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CompetenceLinguistique>>();
      const competenceLinguistique = { id: 123 };
      jest.spyOn(competenceLinguistiqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ competenceLinguistique });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(competenceLinguistiqueService.update).toHaveBeenCalledWith(competenceLinguistique);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEmployeById', () => {
      it('Should return tracked Employe primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmployeById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackLangueById', () => {
      it('Should return tracked Langue primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLangueById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
