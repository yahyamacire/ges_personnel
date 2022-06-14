import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompetenceLinguistique } from '../competence-linguistique.model';

@Component({
  selector: 'jhi-competence-linguistique-detail',
  templateUrl: './competence-linguistique-detail.component.html',
})
export class CompetenceLinguistiqueDetailComponent implements OnInit {
  competenceLinguistique: ICompetenceLinguistique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ competenceLinguistique }) => {
      this.competenceLinguistique = competenceLinguistique;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
