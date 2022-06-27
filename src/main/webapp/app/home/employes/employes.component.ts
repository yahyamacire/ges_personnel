import { Component, OnInit } from '@angular/core';
import { IEmploye } from '../../entities/employe/employe.model';
import { HttpResponse } from '@angular/common/http';
import { EmployeService } from '../../entities/employe/service/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUtils } from '../../core/util/data-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStructure } from '../../entities/structure/structure.model';

@Component({
  selector: 'jhi-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss', '../../../content/css/nicepage.css'],
})
export class EmployesComponent implements OnInit {
  structure: IStructure | null = null;
  employes?: IEmploye[];
  searchTerm = '';
  employesRecherche?: IEmploye[];
  query = null;

  constructor(protected employeService: EmployeService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ structure }) => {
      this.structure = structure;

      //eslint-disable-next-line no-console
      console.log(this.structure);

      if (this.structure) {
        this.employeService.listEmployes(this.structure.id!).subscribe({
          next: (res: HttpResponse<IEmploye[]>) => {
            this.employes = res.body ?? [];
            this.employesRecherche = this.employes;
          },
        });
      }
    });
  }

  trackId(_index: number, item: IEmploye): number {
    return item.id!;
  }

  bypassSecurityTrust(image: string): string {
    return `data:image/png;base64,` + image;
  }

  search(value: string): void {
    if (this.employes) {
      this.employesRecherche = this.employes.filter(val => val.nom!.toLowerCase().includes(value));
    }
  }
}
