import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CompetenceLinguistiqueComponent } from './list/competence-linguistique.component';
import { CompetenceLinguistiqueDetailComponent } from './detail/competence-linguistique-detail.component';
import { CompetenceLinguistiqueUpdateComponent } from './update/competence-linguistique-update.component';
import { CompetenceLinguistiqueDeleteDialogComponent } from './delete/competence-linguistique-delete-dialog.component';
import { CompetenceLinguistiqueRoutingModule } from './route/competence-linguistique-routing.module';

@NgModule({
  imports: [SharedModule, CompetenceLinguistiqueRoutingModule],
  declarations: [
    CompetenceLinguistiqueComponent,
    CompetenceLinguistiqueDetailComponent,
    CompetenceLinguistiqueUpdateComponent,
    CompetenceLinguistiqueDeleteDialogComponent,
  ],
  entryComponents: [CompetenceLinguistiqueDeleteDialogComponent],
})
export class CompetenceLinguistiqueModule {}
