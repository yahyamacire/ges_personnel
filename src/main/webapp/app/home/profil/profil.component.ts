import { Component, OnInit } from '@angular/core';
import { DataUtils } from '../../core/util/data-util.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { IEmploye } from '../../entities/employe/employe.model';
import { EmployeService } from '../../entities/employe/service/employe.service';

@Component({
  selector: 'jhi-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  employe: IEmploye | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute, protected employeService: EmployeService) {}

  ngOnInit(): void {
    this.employeService.employeConnecte().subscribe({
      next: (res: HttpResponse<IEmploye>) => {
        this.employe = res.body;
      },
    });
  }

  bypassSecurityTrust(image: string): string {
    return `data:image/png;base64,` + image;
  }
}
