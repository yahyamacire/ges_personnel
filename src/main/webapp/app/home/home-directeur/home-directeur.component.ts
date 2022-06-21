import { Component, OnInit } from '@angular/core';
import { IStructure } from '../../entities/structure/structure.model';
import { DataUtils } from '../../core/util/data-util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StructureService } from '../../entities/structure/service/structure.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-home-directeur',
  templateUrl: './../detail-structure/detail-structure.component.html',
  styleUrls: ['./home-directeur.component.scss', '../../../content/css/nicepage.css'],
})
export class HomeDirecteurComponent implements OnInit {
  structure: IStructure | null = null;

  constructor(
    protected dataUtils: DataUtils,
    protected activatedRoute: ActivatedRoute,
    protected structureService: StructureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.structureService.getUserStructure().subscribe({
      next: (res: HttpResponse<IStructure>) => {
        this.structure = res.body;

        if (!this.structure) {
          this.router.navigate(['/employe/profil']);
        }
      },
    });
  }

  bypassSecurityTrust(image: string): string {
    return `data:image/png;base64,` + image;
  }

  trackId(_index: number, item: IStructure): number {
    return item.id!;
  }
}
