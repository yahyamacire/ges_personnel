import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StructureComponent } from '../list/structure.component';
import { StructureDetailComponent } from '../detail/structure-detail.component';
import { StructureUpdateComponent } from '../update/structure-update.component';
import { StructureRoutingResolveService } from './structure-routing-resolve.service';
import { HomeDirecteurComponent } from '../../../home/home-directeur/home-directeur.component';
import { DirectionsComponent } from '../../../home/directions/directions.component';
import { DetailStructureComponent } from '../../../home/detail-structure/detail-structure.component';
import { EmployeComponent } from '../../employe/list/employe.component';
import { EmployesComponent } from '../../../home/employes/employes.component';

const structureRoute: Routes = [
  {
    path: '',
    component: StructureComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StructureDetailComponent,
    resolve: {
      structure: StructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/details',
    component: DetailStructureComponent,
    resolve: {
      structure: StructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },

  {
    path: ':id/employes',
    component: EmployesComponent,
    resolve: {
      structure: StructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StructureUpdateComponent,
    resolve: {
      structure: StructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StructureUpdateComponent,
    resolve: {
      structure: StructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'directions',
    component: DirectionsComponent,
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(structureRoute)],
  exports: [RouterModule],
})
export class StructureRoutingModule {}
