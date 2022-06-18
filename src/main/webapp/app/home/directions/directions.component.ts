import { Component, OnInit } from '@angular/core';
import { IStructure } from '../../entities/structure/structure.model';
import { StructureService } from '../../entities/structure/service/structure.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss', '../../../content/css/nicepage.css'],
})
export class DirectionsComponent implements OnInit {
  structures?: IStructure[];

  constructor(protected structureService: StructureService) {}

  ngOnInit(): void {
    this.structureService.directions().subscribe({
      next: (res: HttpResponse<IStructure[]>) => {
        this.structures = res.body ?? [];
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
