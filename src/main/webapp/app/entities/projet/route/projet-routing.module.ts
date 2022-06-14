import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProjetComponent } from '../list/projet.component';
import { ProjetDetailComponent } from '../detail/projet-detail.component';
import { ProjetUpdateComponent } from '../update/projet-update.component';
import { ProjetRoutingResolveService } from './projet-routing-resolve.service';

const projetRoute: Routes = [
  {
    path: '',
    component: ProjetComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProjetDetailComponent,
    resolve: {
      projet: ProjetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProjetUpdateComponent,
    resolve: {
      projet: ProjetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProjetUpdateComponent,
    resolve: {
      projet: ProjetRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(projetRoute)],
  exports: [RouterModule],
})
export class ProjetRoutingModule {}
