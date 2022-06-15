import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IDiplome, Diplome } from '../diplome.model';
import { DiplomeService } from '../service/diplome.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IEmploye } from 'app/entities/employe/employe.model';
import { EmployeService } from 'app/entities/employe/service/employe.service';

@Component({
  selector: 'jhi-diplome-update',
  templateUrl: './diplome-update.component.html',
})
export class DiplomeUpdateComponent implements OnInit {
  isSaving = false;

  employesSharedCollection: IEmploye[] = [];

  editForm = this.fb.group({
    id: [],
    libelle: [],
    universite: [],
    date: [],
    description: [],
    diplome: [],
    diplomeContentType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected diplomeService: DiplomeService,
    protected employeService: EmployeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diplome }) => {
      if (diplome.id === undefined) {
        const today = dayjs().startOf('day');
        diplome.date = today;
      }

      this.updateForm(diplome);

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
    const diplome = this.createFromForm();
    if (diplome.id !== undefined) {
      this.subscribeToSaveResponse(this.diplomeService.update(diplome));
    } else {
      this.subscribeToSaveResponse(this.diplomeService.create(diplome));
    }
  }

  trackEmployeById(_index: number, item: IEmploye): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiplome>>): void {
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

  protected updateForm(diplome: IDiplome): void {
    this.editForm.patchValue({
      id: diplome.id,
      libelle: diplome.libelle,
      universite: diplome.universite,
      date: diplome.date ? diplome.date.format(DATE_TIME_FORMAT) : null,
      description: diplome.description,
      diplome: diplome.diplome,
      diplomeContentType: diplome.diplomeContentType,
    });

    this.employesSharedCollection = this.employeService.addEmployeToCollectionIfMissing(this.employesSharedCollection, diplome.employe);
  }

  protected loadRelationshipsOptions(): void {
    this.employeService
      .query()
      .pipe(map((res: HttpResponse<IEmploye[]>) => res.body ?? []))
      .pipe(
        map((employes: IEmploye[]) => this.employeService.addEmployeToCollectionIfMissing(employes, this.editForm.get('employe')!.value))
      )
      .subscribe((employes: IEmploye[]) => (this.employesSharedCollection = employes));
  }

  protected createFromForm(): IDiplome {
    return {
      ...new Diplome(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      universite: this.editForm.get(['universite'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description'])!.value,
      diplomeContentType: this.editForm.get(['diplomeContentType'])!.value,
      diplome: this.editForm.get(['diplome'])!.value,
    };
  }
}
