import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmploye } from '../employe.model';
import { DataUtils } from 'app/core/util/data-util.service';
import { IDiplome } from '../../diplome/diplome.model';
import { DiplomeDeleteDialogComponent } from '../../diplome/delete/diplome-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-employe-detail',
  templateUrl: './employe-detail.component.html',
})
export class EmployeDetailComponent implements OnInit {
  employe: IEmploye | null = null;

  constructor(protected modalService: NgbModal, protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employe }) => {
      this.employe = employe;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }

  trackId(_index: number, item: IDiplome): number {
    return item.id!;
  }

  delete(diplome: IDiplome): void {
    const modalRef = this.modalService.open(DiplomeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diplome = diplome;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.ngOnInit();
      }
    });
  }

  bypassSecurityTrust(photo: string): string {
    return `data:image/png;base64,` + photo;
  }
}
