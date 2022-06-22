import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HomeMinistreComponent } from './home-ministre/home-ministre.component';
import { HomeDirecteurComponent } from './home-directeur/home-directeur.component';
import { DirectionsComponent } from './directions/directions.component';
import { DetailStructureComponent } from './detail-structure/detail-structure.component';
import { EmployesComponent } from './employes/employes.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { SecretariatComponent } from './secretariat/secretariat.component';
import { EmployesTypeComponent } from './employes-type/employes-type.component';
import { ProfilComponent } from './profil/profil.component';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [
    HomeComponent,
    HomeMinistreComponent,
    HomeDirecteurComponent,
    DirectionsComponent,
    DetailStructureComponent,
    EmployesComponent,
    CabinetComponent,
    SecretariatComponent,
    EmployesTypeComponent,
    ProfilComponent,
    SearchFilterPipe,
  ],
})
export class HomeModule {}
