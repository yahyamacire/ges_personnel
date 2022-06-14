import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IExperience, Experience } from '../experience.model';
import { ExperienceService } from '../service/experience.service';
import { IEmploye } from 'app/entities/employe/employe.model';
import { EmployeService } from 'app/entities/employe/service/employe.service';

@Component({
  selector: 'jhi-experience-update',
  templateUrl: './experience-update.component.html',
})
export class ExperienceUpdateComponent implements OnInit {
  isSaving = false;

  employesSharedCollection: IEmploye[] = [];

  editForm = this.fb.group({
    id: [],
    entreprise: [null, [Validators.required]],
    dateDebut: [null, [Validators.required]],
    dateFin: [],
    description: [null, [Validators.required]],
    employe: [],
  });

  constructor(
    protected experienceService: ExperienceService,
    protected employeService: EmployeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ experience }) => {
      if (experience.id === undefined) {
        const today = dayjs().startOf('day');
        experience.dateDebut = today;
        experience.dateFin = today;
      }

      this.updateForm(experience);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const experience = this.createFromForm();
    if (experience.id !== undefined) {
      this.subscribeToSaveResponse(this.experienceService.update(experience));
    } else {
      this.subscribeToSaveResponse(this.experienceService.create(experience));
    }
  }

  trackEmployeById(_index: number, item: IEmploye): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExperience>>): void {
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

  protected updateForm(experience: IExperience): void {
    this.editForm.patchValue({
      id: experience.id,
      entreprise: experience.entreprise,
      dateDebut: experience.dateDebut ? experience.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFin: experience.dateFin ? experience.dateFin.format(DATE_TIME_FORMAT) : null,
      description: experience.description,
      employe: experience.employe,
    });

    this.employesSharedCollection = this.employeService.addEmployeToCollectionIfMissing(this.employesSharedCollection, experience.employe);
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

  protected createFromForm(): IExperience {
    return {
      ...new Experience(),
      id: this.editForm.get(['id'])!.value,
      entreprise: this.editForm.get(['entreprise'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value ? dayjs(this.editForm.get(['dateDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      dateFin: this.editForm.get(['dateFin'])!.value ? dayjs(this.editForm.get(['dateFin'])!.value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description'])!.value,
      employe: this.editForm.get(['employe'])!.value,
    };
  }
}
