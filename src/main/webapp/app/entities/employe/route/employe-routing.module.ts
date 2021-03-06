import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeComponent } from '../list/employe.component';
import { EmployeDetailComponent } from '../detail/employe-detail.component';
import { EmployeUpdateComponent } from '../update/employe-update.component';
import { EmployeRoutingResolveService } from './employe-routing-resolve.service';
import { EmployesTypeComponent } from '../../../home/employes-type/employes-type.component';
import { ProfilComponent } from '../../../home/profil/profil.component';

const employeRoute: Routes = [
  {
    path: '',
    component: EmployeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeDetailComponent,
    resolve: {
      employe: EmployeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeUpdateComponent,
    resolve: {
      employe: EmployeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeUpdateComponent,
    resolve: {
      employe: EmployeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':type/types',
    component: EmployesTypeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeRoute)],
  exports: [RouterModule],
})
export class EmployeRoutingModule {}
