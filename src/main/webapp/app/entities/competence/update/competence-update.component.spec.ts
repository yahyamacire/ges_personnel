import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CompetenceService } from '../service/competence.service';
import { ICompetence, Competence } from '../competence.model';
import { IEmploye } from 'app/entities/employe/employe.model';
import { EmployeService } from 'app/entities/employe/service/employe.service';

import { CompetenceUpdateComponent } from './competence-update.component';

describe('Competence Management Update Component', () => {
  let comp: CompetenceUpdateComponent;
  let fixture: ComponentFixture<CompetenceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let competenceService: CompetenceService;
  let employeService: EmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CompetenceUpdateComponent],
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
      .overrideTemplate(CompetenceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompetenceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    competenceService = TestBed.inject(CompetenceService);
    employeService = TestBed.inject(EmployeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Employe query and add missing value', () => {
      const competence: ICompetence = { id: 456 };
      const employe: IEmploye = { id: 8591 };
      competence.employe = employe;

      const employeCollection: IEmploye[] = [{ id: 26150 }];
      jest.spyOn(employeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeCollection })));
      const additionalEmployes = [employe];
      const expectedCollection: IEmploye[] = [...additionalEmployes, ...employeCollection];
      jest.spyOn(employeService, 'addEmployeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ competence });
      comp.ngOnInit();

      expect(employeService.query).toHaveBeenCalled();
      expect(employeService.addEmployeToCollectionIfMissing).toHaveBeenCalledWith(employeCollection, ...additionalEmployes);
      expect(comp.employesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const competence: ICompetence = { id: 456 };
      const employe: IEmploye = { id: 1550 };
      competence.employe = employe;

      activatedRoute.data = of({ competence });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(competence));
      expect(comp.employesSharedCollection).toContain(employe);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Competence>>();
      const competence = { id: 123 };
      jest.spyOn(competenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ competence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: competence }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(competenceService.update).toHaveBeenCalledWith(competence);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Competence>>();
      const competence = new Competence();
      jest.spyOn(competenceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ competence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: competence }));
      saveSubject.complete();

      // THEN
      expect(competenceService.create).toHaveBeenCalledWith(competence);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Competence>>();
      const competence = { id: 123 };
      jest.spyOn(competenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ competence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(competenceService.update).toHaveBeenCalledWith(competence);
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
  });
});
