import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompetenceLinguistique } from '../competence-linguistique.model';
import { CompetenceLinguistiqueService } from '../service/competence-linguistique.service';

@Component({
  templateUrl: './competence-linguistique-delete-dialog.component.html',
})
export class CompetenceLinguistiqueDeleteDialogComponent {
  competenceLinguistique?: ICompetenceLinguistique;

  constructor(protected competenceLinguistiqueService: CompetenceLinguistiqueService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.competenceLinguistiqueService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
