import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Niveau } from 'app/entities/enumerations/niveau.model';
import { ICompetenceLinguistique, CompetenceLinguistique } from '../competence-linguistique.model';

import { CompetenceLinguistiqueService } from './competence-linguistique.service';

describe('CompetenceLinguistique Service', () => {
  let service: CompetenceLinguistiqueService;
  let httpMock: HttpTestingController;
  let elemDefault: ICompetenceLinguistique;
  let expectedResult: ICompetenceLinguistique | ICompetenceLinguistique[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CompetenceLinguistiqueService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      niveau: Niveau.TRES_BIEN,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a CompetenceLinguistique', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new CompetenceLinguistique()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CompetenceLinguistique', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          niveau: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CompetenceLinguistique', () => {
      const patchObject = Object.assign({}, new CompetenceLinguistique());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CompetenceLinguistique', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          niveau: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a CompetenceLinguistique', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCompetenceLinguistiqueToCollectionIfMissing', () => {
      it('should add a CompetenceLinguistique to an empty array', () => {
        const competenceLinguistique: ICompetenceLinguistique = { id: 123 };
        expectedResult = service.addCompetenceLinguistiqueToCollectionIfMissing([], competenceLinguistique);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(competenceLinguistique);
      });

      it('should not add a CompetenceLinguistique to an array that contains it', () => {
        const competenceLinguistique: ICompetenceLinguistique = { id: 123 };
        const competenceLinguistiqueCollection: ICompetenceLinguistique[] = [
          {
            ...competenceLinguistique,
          },
          { id: 456 },
        ];
        expectedResult = service.addCompetenceLinguistiqueToCollectionIfMissing(competenceLinguistiqueCollection, competenceLinguistique);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CompetenceLinguistique to an array that doesn't contain it", () => {
        const competenceLinguistique: ICompetenceLinguistique = { id: 123 };
        const competenceLinguistiqueCollection: ICompetenceLinguistique[] = [{ id: 456 }];
        expectedResult = service.addCompetenceLinguistiqueToCollectionIfMissing(competenceLinguistiqueCollection, competenceLinguistique);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(competenceLinguistique);
      });

      it('should add only unique CompetenceLinguistique to an array', () => {
        const competenceLinguistiqueArray: ICompetenceLinguistique[] = [{ id: 123 }, { id: 456 }, { id: 32832 }];
        const competenceLinguistiqueCollection: ICompetenceLinguistique[] = [{ id: 123 }];
        expectedResult = service.addCompetenceLinguistiqueToCollectionIfMissing(
          competenceLinguistiqueCollection,
          ...competenceLinguistiqueArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const competenceLinguistique: ICompetenceLinguistique = { id: 123 };
        const competenceLinguistique2: ICompetenceLinguistique = { id: 456 };
        expectedResult = service.addCompetenceLinguistiqueToCollectionIfMissing([], competenceLinguistique, competenceLinguistique2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(competenceLinguistique);
        expect(expectedResult).toContain(competenceLinguistique2);
      });

      it('should accept null and undefined values', () => {
        const competenceLinguistique: ICompetenceLinguistique = { id: 123 };
        expectedResult = service.addCompetenceLinguistiqueToCollectionIfMissing([], null, competenceLinguistique, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(competenceLinguistique);
      });

      it('should return initial array if no CompetenceLinguistique is added', () => {
        const competenceLinguistiqueCollection: ICompetenceLinguistique[] = [{ id: 123 }];
        expectedResult = service.addCompetenceLinguistiqueToCollectionIfMissing(competenceLinguistiqueCollection, undefined, null);
        expect(expectedResult).toEqual(competenceLinguistiqueCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
