import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStructure, Structure } from '../structure.model';
import { StructureService } from '../service/structure.service';
import { Type } from 'app/entities/enumerations/type.model';

@Component({
  selector: 'jhi-structure-update',
  templateUrl: './structure-update.component.html',
})
export class StructureUpdateComponent implements OnInit {
  isSaving = false;
  typeValues = Object.keys(Type);

  parentsCollection: IStructure[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    type: [],
    parent: [],
  });

  constructor(protected structureService: StructureService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ structure }) => {
      this.updateForm(structure);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const structure = this.createFromForm();
    if (structure.id !== undefined) {
      this.subscribeToSaveResponse(this.structureService.update(structure));
    } else {
      this.subscribeToSaveResponse(this.structureService.create(structure));
    }
  }

  trackStructureById(_index: number, item: IStructure): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStructure>>): void {
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

  protected updateForm(structure: IStructure): void {
    this.editForm.patchValue({
      id: structure.id,
      nom: structure.nom,
      type: structure.type,
      parent: structure.parent,
    });

    this.parentsCollection = this.structureService.addStructureToCollectionIfMissing(this.parentsCollection, structure.parent);
  }

  protected loadRelationshipsOptions(): void {
    this.structureService
      .query({ filter: 'structure-is-null' })
      .pipe(map((res: HttpResponse<IStructure[]>) => res.body ?? []))
      .pipe(
        map((structures: IStructure[]) =>
          this.structureService.addStructureToCollectionIfMissing(structures, this.editForm.get('parent')!.value)
        )
      )
      .subscribe((structures: IStructure[]) => (this.parentsCollection = structures));
  }

  protected createFromForm(): IStructure {
    return {
      ...new Structure(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      type: this.editForm.get(['type'])!.value,
      parent: this.editForm.get(['parent'])!.value,
    };
  }
}
