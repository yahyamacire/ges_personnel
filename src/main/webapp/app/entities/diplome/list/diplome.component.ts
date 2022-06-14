import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiplome } from '../diplome.model';
import { DiplomeService } from '../service/diplome.service';
import { DiplomeDeleteDialogComponent } from '../delete/diplome-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-diplome',
  templateUrl: './diplome.component.html',
})
export class DiplomeComponent implements OnInit {
  diplomes?: IDiplome[];
  isLoading = false;

  constructor(protected diplomeService: DiplomeService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.diplomeService.query().subscribe({
      next: (res: HttpResponse<IDiplome[]>) => {
        this.isLoading = false;
        this.diplomes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDiplome): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(diplome: IDiplome): void {
    const modalRef = this.modalService.open(DiplomeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diplome = diplome;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
