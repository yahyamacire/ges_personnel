import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProjet } from '../projet.model';
import { ProjetService } from '../service/projet.service';
import { ProjetDeleteDialogComponent } from '../delete/projet-delete-dialog.component';

@Component({
  selector: 'jhi-projet',
  templateUrl: './projet.component.html',
})
export class ProjetComponent implements OnInit {
  projets?: IProjet[];
  isLoading = false;

  constructor(protected projetService: ProjetService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.projetService.query().subscribe({
      next: (res: HttpResponse<IProjet[]>) => {
        this.isLoading = false;
        this.projets = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IProjet): number {
    return item.id!;
  }

  delete(projet: IProjet): void {
    const modalRef = this.modalService.open(ProjetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.projet = projet;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
