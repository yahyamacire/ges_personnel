import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProjet } from '../projet.model';
import { ProjetService } from '../service/projet.service';

@Component({
  templateUrl: './projet-delete-dialog.component.html',
})
export class ProjetDeleteDialogComponent {
  projet?: IProjet;

  constructor(protected projetService: ProjetService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.projetService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
