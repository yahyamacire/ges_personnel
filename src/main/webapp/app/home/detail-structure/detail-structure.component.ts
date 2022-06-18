import { Component, OnInit } from '@angular/core';
import { IStructure } from '../../entities/structure/structure.model';
import { DataUtils } from '../../core/util/data-util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-detail-structure',
  templateUrl: './detail-structure.component.html',
  styleUrls: ['./detail-structure.component.scss', '../../../content/css/nicepage.css'],
})
export class DetailStructureComponent implements OnInit {
  structure: IStructure | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ structure }) => {
      this.structure = structure;

      //eslint-disable-next-line no-console
      console.log(this.structure);
    });
  }

  bypassSecurityTrust(image: string): string {
    return `data:image/png;base64,` + image;
  }

  trackId(_index: number, item: IStructure): number {
    return item.id!;
  }
}
