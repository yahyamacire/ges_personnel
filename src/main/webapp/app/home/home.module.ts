import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HomeMinistreComponent } from './home-ministre/home-ministre.component';
import { HomeDirecteurComponent } from './home-directeur/home-directeur.component';
import { DirectionsComponent } from './directions/directions.component';
import { DetailStructureComponent } from './detail-structure/detail-structure.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, HomeMinistreComponent, HomeDirecteurComponent, DirectionsComponent, DetailStructureComponent],
})
export class HomeModule {}
