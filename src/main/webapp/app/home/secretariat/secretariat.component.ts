import { Component, OnInit } from '@angular/core';
import { IStructure } from '../../entities/structure/structure.model';
import { StructureService } from '../../entities/structure/service/structure.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-secretariat',
  templateUrl: './secretariat.component.html',
  styleUrls: ['./secretariat.component.scss', '../../../content/css/nicepage.css'],
})
export class SecretariatComponent implements OnInit {
  structure: IStructure | null = null;

  constructor(protected structureService: StructureService,protected activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    
    this.structureService.structureSG().subscribe({
<<<<<<< HEAD
      next: (res: HttpResponse<IStructure>) => {
        this.structure= res.body;
        
=======
      next: (res: HttpResponse<IStructure[]>) => {
        this.structures = res.body ?? [];
>>>>>>> 05a551c178118e44a4704264e78be580d80d1b19
      },
    });
  }

  trackId(_index: number, item: IStructure): number {
    return item.id!;
  }

  bypassSecurityTrust(image: string): string {
    return `data:image/png;base64,` + image;
  }
}
