import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICompetenceLinguistique, CompetenceLinguistique } from '../competence-linguistique.model';
import { CompetenceLinguistiqueService } from '../service/competence-linguistique.service';
import { IEmploye } from 'app/entities/employe/employe.model';
import { EmployeService } from 'app/entities/employe/service/employe.service';
import { ILangue } from 'app/entities/langue/langue.model';
import { LangueService } from 'app/entities/langue/service/langue.service';
import { Niveau } from 'app/entities/enumerations/niveau.model';

@Component({
  selector: 'jhi-competence-linguistique-update',
  templateUrl: './competence-linguistique-update.component.html',
})
export class CompetenceLinguistiqueUpdateComponent implements OnInit {
  isSaving = false;
  niveauValues = Object.keys(Niveau);

  employesSharedCollection: IEmploye[] = [];
  languesSharedCollection: ILangue[] = [];

  editForm = this.fb.group({
    id: [],
    niveau: [],
    employe: [],
    langue: [],
  });

  constructor(
    protected competenceLinguistiqueService: CompetenceLinguistiqueService,
    protected employeService: EmployeService,
    protected langueService: LangueService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ competenceLinguistique }) => {
      this.updateForm(competenceLinguistique);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const competenceLinguistique = this.createFromForm();
    if (competenceLinguistique.id !== undefined) {
      this.subscribeToSaveResponse(this.competenceLinguistiqueService.update(competenceLinguistique));
    } else {
      this.subscribeToSaveResponse(this.competenceLinguistiqueService.create(competenceLinguistique));
    }
  }

  trackEmployeById(_index: number, item: IEmploye): number {
    return item.id!;
  }

  trackLangueById(_index: number, item: ILangue): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompetenceLinguistique>>): void {
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

  protected updateForm(competenceLinguistique: ICompetenceLinguistique): void {
    this.editForm.patchValue({
      id: competenceLinguistique.id,
      niveau: competenceLinguistique.niveau,
      employe: competenceLinguistique.employe,
      langue: competenceLinguistique.langue,
    });

    this.employesSharedCollection = this.employeService.addEmployeToCollectionIfMissing(
      this.employesSharedCollection,
      competenceLinguistique.employe
    );
    this.languesSharedCollection = this.langueService.addLangueToCollectionIfMissing(
      this.languesSharedCollection,
      competenceLinguistique.langue
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeService
      .query()
      .pipe(map((res: HttpResponse<IEmploye[]>) => res.body ?? []))
      .pipe(
        map((employes: IEmploye[]) => this.employeService.addEmployeToCollectionIfMissing(employes, this.editForm.get('employe')!.value))
      )
      .subscribe((employes: IEmploye[]) => (this.employesSharedCollection = employes));

    this.langueService
      .query()
      .pipe(map((res: HttpResponse<ILangue[]>) => res.body ?? []))
      .pipe(map((langues: ILangue[]) => this.langueService.addLangueToCollectionIfMissing(langues, this.editForm.get('langue')!.value)))
      .subscribe((langues: ILangue[]) => (this.languesSharedCollection = langues));
  }

  protected createFromForm(): ICompetenceLinguistique {
    return {
      ...new CompetenceLinguistique(),
      id: this.editForm.get(['id'])!.value,
      niveau: this.editForm.get(['niveau'])!.value,
      employe: this.editForm.get(['employe'])!.value,
      langue: this.editForm.get(['langue'])!.value,
    };
  }
}
