import { Component, OnInit } from '@angular/core';
import { IStructure } from '../../entities/structure/structure.model';
import { DataUtils } from '../../core/util/data-util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-home-directeur',
  templateUrl: './../detail-structure/detail-structure.component.html',
  styleUrls: ['./home-directeur.component.scss'],
})
export class HomeDirecteurComponent implements OnInit {
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
