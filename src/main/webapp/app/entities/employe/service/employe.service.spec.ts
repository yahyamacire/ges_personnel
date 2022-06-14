import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Genre } from 'app/entities/enumerations/genre.model';
import { Fonction } from 'app/entities/enumerations/fonction.model';
import { Status } from 'app/entities/enumerations/status.model';
import { Domaine } from 'app/entities/enumerations/domaine.model';
import { IEmploye, Employe } from '../employe.model';

import { EmployeService } from './employe.service';

describe('Employe Service', () => {
  let service: EmployeService;
  let httpMock: HttpTestingController;
  let elemDefault: IEmploye;
  let expectedResult: IEmploye | IEmploye[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmployeService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      nni: 0,
      nom: 'AAAAAAA',
      prenom: 'AAAAAAA',
      sexe: Genre.HOMME,
      dateNaissance: currentDate,
      email: 'AAAAAAA',
      telephone: 0,
      dateRecrutement: currentDate,
      matricule: 'AAAAAAA',
      fonction: Fonction.MINISTRE,
      adresse: 'AAAAAAA',
      status: Status.DISPONIBLE,
      domaine: Domaine.NUMERIQUE,
      photoContentType: 'image/png',
      photo: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dateNaissance: currentDate.format(DATE_TIME_FORMAT),
          dateRecrutement: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Employe', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          dateNaissance: currentDate.format(DATE_TIME_FORMAT),
          dateRecrutement: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateNaissance: currentDate,
          dateRecrutement: currentDate,
        },
        returnedFromService
      );

      service.create(new Employe()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Employe', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nni: 1,
          nom: 'BBBBBB',
          prenom: 'BBBBBB',
          sexe: 'BBBBBB',
          dateNaissance: currentDate.format(DATE_TIME_FORMAT),
          email: 'BBBBBB',
          telephone: 1,
          dateRecrutement: currentDate.format(DATE_TIME_FORMAT),
          matricule: 'BBBBBB',
          fonction: 'BBBBBB',
          adresse: 'BBBBBB',
          status: 'BBBBBB',
          domaine: 'BBBBBB',
          photo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateNaissance: currentDate,
          dateRecrutement: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Employe', () => {
      const patchObject = Object.assign(
        {
          nom: 'BBBBBB',
          prenom: 'BBBBBB',
          adresse: 'BBBBBB',
          status: 'BBBBBB',
        },
        new Employe()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dateNaissance: currentDate,
          dateRecrutement: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Employe', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nni: 1,
          nom: 'BBBBBB',
          prenom: 'BBBBBB',
          sexe: 'BBBBBB',
          dateNaissance: currentDate.format(DATE_TIME_FORMAT),
          email: 'BBBBBB',
          telephone: 1,
          dateRecrutement: currentDate.format(DATE_TIME_FORMAT),
          matricule: 'BBBBBB',
          fonction: 'BBBBBB',
          adresse: 'BBBBBB',
          status: 'BBBBBB',
          domaine: 'BBBBBB',
          photo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dateNaissance: currentDate,
          dateRecrutement: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Employe', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEmployeToCollectionIfMissing', () => {
      it('should add a Employe to an empty array', () => {
        const employe: IEmploye = { id: 123 };
        expectedResult = service.addEmployeToCollectionIfMissing([], employe);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employe);
      });

      it('should not add a Employe to an array that contains it', () => {
        const employe: IEmploye = { id: 123 };
        const employeCollection: IEmploye[] = [
          {
            ...employe,
          },
          { id: 456 },
        ];
        expectedResult = service.addEmployeToCollectionIfMissing(employeCollection, employe);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Employe to an array that doesn't contain it", () => {
        const employe: IEmploye = { id: 123 };
        const employeCollection: IEmploye[] = [{ id: 456 }];
        expectedResult = service.addEmployeToCollectionIfMissing(employeCollection, employe);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employe);
      });

      it('should add only unique Employe to an array', () => {
        const employeArray: IEmploye[] = [{ id: 123 }, { id: 456 }, { id: 5290 }];
        const employeCollection: IEmploye[] = [{ id: 123 }];
        expectedResult = service.addEmployeToCollectionIfMissing(employeCollection, ...employeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const employe: IEmploye = { id: 123 };
        const employe2: IEmploye = { id: 456 };
        expectedResult = service.addEmployeToCollectionIfMissing([], employe, employe2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employe);
        expect(expectedResult).toContain(employe2);
      });

      it('should accept null and undefined values', () => {
        const employe: IEmploye = { id: 123 };
        expectedResult = service.addEmployeToCollectionIfMissing([], null, employe, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employe);
      });

      it('should return initial array if no Employe is added', () => {
        const employeCollection: IEmploye[] = [{ id: 123 }];
        expectedResult = service.addEmployeToCollectionIfMissing(employeCollection, undefined, null);
        expect(expectedResult).toEqual(employeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
