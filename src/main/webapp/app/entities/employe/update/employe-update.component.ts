import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IEmploye, Employe } from '../employe.model';
import { EmployeService } from '../service/employe.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IProjet } from 'app/entities/projet/projet.model';
import { ProjetService } from 'app/entities/projet/service/projet.service';
import { IStructure } from 'app/entities/structure/structure.model';
import { StructureService } from 'app/entities/structure/service/structure.service';
import { Genre } from 'app/entities/enumerations/genre.model';
import { Fonction } from 'app/entities/enumerations/fonction.model';
import { Status } from 'app/entities/enumerations/status.model';
import { Domaine } from 'app/entities/enumerations/domaine.model';

@Component({
  selector: 'jhi-employe-update',
  templateUrl: './employe-update.component.html',
})
export class EmployeUpdateComponent implements OnInit {
  isSaving = false;
  genreValues = Object.keys(Genre);
  fonctionValues = Object.keys(Fonction);
  statusValues = Object.keys(Status);
  domaineValues = Object.keys(Domaine);

  projetsSharedCollection: IProjet[] = [];
  structuresSharedCollection: IStructure[] = [];

  editForm = this.fb.group({
    id: [],
    nni: [null, [Validators.required]],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    sexe: [null, [Validators.required]],
    dateNaissance: [null, [Validators.required]],
    email: [null, [Validators.required]],
    telephone: [null, [Validators.required]],
    dateRecrutement: [],
    matricule: [],
    fonction: [null, [Validators.required]],
    adresse: [],
    status: [],
    domaine: [],
    photo: [],
    photoContentType: [],
    projets: [],
    structure: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected employeService: EmployeService,
    protected projetService: ProjetService,
    protected structureService: StructureService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employe }) => {
      if (employe.id === undefined) {
        const today = dayjs().startOf('day');
        employe.dateNaissance = today;
        employe.dateRecrutement = today;
      }

      this.updateForm(employe);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gesEmployerApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employe = this.createFromForm();
    if (employe.id !== undefined) {
      this.subscribeToSaveResponse(this.employeService.update(employe));
    } else {
      this.subscribeToSaveResponse(this.employeService.create(employe));
    }
  }

  trackProjetById(_index: number, item: IProjet): number {
    return item.id!;
  }

  trackStructureById(_index: number, item: IStructure): number {
    return item.id!;
  }

  getSelectedProjet(option: IProjet, selectedVals?: IProjet[]): IProjet {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmploye>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(employe: IEmploye): void {
    this.editForm.patchValue({
      id: employe.id,
      nni: employe.nni,
      nom: employe.nom,
      prenom: employe.prenom,
      sexe: employe.sexe,
      dateNaissance: employe.dateNaissance ? employe.dateNaissance.format(DATE_TIME_FORMAT) : null,
      email: employe.email,
      telephone: employe.telephone,
      dateRecrutement: employe.dateRecrutement ? employe.dateRecrutement.format(DATE_TIME_FORMAT) : null,
      matricule: employe.matricule,
      fonction: employe.fonction,
      adresse: employe.adresse,
      status: employe.status,
      domaine: employe.domaine,
      photo: employe.photo,
      photoContentType: employe.photoContentType,
      projets: employe.projets,
      structure: employe.structure,
    });

    this.projetsSharedCollection = this.projetService.addProjetToCollectionIfMissing(
      this.projetsSharedCollection,
      ...(employe.projets ?? [])
    );
    this.structuresSharedCollection = this.structureService.addStructureToCollectionIfMissing(
      this.structuresSharedCollection,
      employe.structure
    );
  }

  protected loadRelationshipsOptions(): void {
    this.projetService
      .query()
      .pipe(map((res: HttpResponse<IProjet[]>) => res.body ?? []))
      .pipe(
        map((projets: IProjet[]) =>
          this.projetService.addProjetToCollectionIfMissing(projets, ...(this.editForm.get('projets')!.value ?? []))
        )
      )
      .subscribe((projets: IProjet[]) => (this.projetsSharedCollection = projets));

    this.structureService
      .query()
      .pipe(map((res: HttpResponse<IStructure[]>) => res.body ?? []))
      .pipe(
        map((structures: IStructure[]) =>
          this.structureService.addStructureToCollectionIfMissing(structures, this.editForm.get('structure')!.value)
        )
      )
      .subscribe((structures: IStructure[]) => (this.structuresSharedCollection = structures));
  }

  protected createFromForm(): IEmploye {
    return {
      ...new Employe(),
      id: this.editForm.get(['id'])!.value,
      nni: this.editForm.get(['nni'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value
        ? dayjs(this.editForm.get(['dateNaissance'])!.value, DATE_TIME_FORMAT)
        : undefined,
      email: this.editForm.get(['email'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      dateRecrutement: this.editForm.get(['dateRecrutement'])!.value
        ? dayjs(this.editForm.get(['dateRecrutement'])!.value, DATE_TIME_FORMAT)
        : undefined,
      matricule: this.editForm.get(['matricule'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      status: this.editForm.get(['status'])!.value,
      domaine: this.editForm.get(['domaine'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      projets: this.editForm.get(['projets'])!.value,
      structure: this.editForm.get(['structure'])!.value,
    };
  }
}
