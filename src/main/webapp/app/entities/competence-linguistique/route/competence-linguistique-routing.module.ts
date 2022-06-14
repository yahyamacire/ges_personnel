import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CompetenceLinguistiqueComponent } from '../list/competence-linguistique.component';
import { CompetenceLinguistiqueDetailComponent } from '../detail/competence-linguistique-detail.component';
import { CompetenceLinguistiqueUpdateComponent } from '../update/competence-linguistique-update.component';
import { CompetenceLinguistiqueRoutingResolveService } from './competence-linguistique-routing-resolve.service';

const competenceLinguistiqueRoute: Routes = [
  {
    path: '',
    component: CompetenceLinguistiqueComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompetenceLinguistiqueDetailComponent,
    resolve: {
      competenceLinguistique: CompetenceLinguistiqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompetenceLinguistiqueUpdateComponent,
    resolve: {
      competenceLinguistique: CompetenceLinguistiqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompetenceLinguistiqueUpdateComponent,
    resolve: {
      competenceLinguistique: CompetenceLinguistiqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(competenceLinguistiqueRoute)],
  exports: [RouterModule],
})
export class CompetenceLinguistiqueRoutingModule {}
