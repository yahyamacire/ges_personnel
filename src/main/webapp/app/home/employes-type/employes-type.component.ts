import { Component, OnInit } from '@angular/core';
import { IStructure } from '../../entities/structure/structure.model';
import { IEmploye } from '../../entities/employe/employe.model';
import { EmployeService } from '../../entities/employe/service/employe.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-employes-type',
  templateUrl: '../employes/employes.component.html',

  styleUrls: ['./employes-type.component.scss', '../../../content/css/nicepage.css'],
})
export class EmployesTypeComponent implements OnInit {
  structure: IStructure | null = null;
  employes?: IEmploye[];

  searchTerm = '';
  employesRecherche?: IEmploye[];

  constructor(protected route: ActivatedRoute, protected employeService: EmployeService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');
    if (type) {
      this.employeService.listEmployesType(type).subscribe({
        next: (res: HttpResponse<IEmploye[]>) => {
          this.employes = res.body ?? [];
        },
      });
    }
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
