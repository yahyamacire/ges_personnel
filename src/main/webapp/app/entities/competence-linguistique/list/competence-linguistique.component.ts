import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompetenceLinguistique } from '../competence-linguistique.model';
import { CompetenceLinguistiqueService } from '../service/competence-linguistique.service';
import { CompetenceLinguistiqueDeleteDialogComponent } from '../delete/competence-linguistique-delete-dialog.component';

@Component({
  selector: 'jhi-competence-linguistique',
  templateUrl: './competence-linguistique.component.html',
})
export class CompetenceLinguistiqueComponent implements OnInit {
  competenceLinguistiques?: ICompetenceLinguistique[];
  isLoading = false;

  constructor(protected competenceLinguistiqueService: CompetenceLinguistiqueService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.competenceLinguistiqueService.query().subscribe({
      next: (res: HttpResponse<ICompetenceLinguistique[]>) => {
        this.isLoading = false;
        this.competenceLinguistiques = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICompetenceLinguistique): number {
    return item.id!;
  }

  delete(competenceLinguistique: ICompetenceLinguistique): void {
    const modalRef = this.modalService.open(CompetenceLinguistiqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.competenceLinguistique = competenceLinguistique;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
