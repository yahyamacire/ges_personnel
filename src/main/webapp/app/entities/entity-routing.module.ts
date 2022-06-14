import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employe',
        data: { pageTitle: 'gesEmployerApp.employe.home.title' },
        loadChildren: () => import('./employe/employe.module').then(m => m.EmployeModule),
      },
      {
        path: 'langue',
        data: { pageTitle: 'gesEmployerApp.langue.home.title' },
        loadChildren: () => import('./langue/langue.module').then(m => m.LangueModule),
      },
      {
        path: 'competence',
        data: { pageTitle: 'gesEmployerApp.competence.home.title' },
        loadChildren: () => import('./competence/competence.module').then(m => m.CompetenceModule),
      },
      {
        path: 'competence-linguistique',
        data: { pageTitle: 'gesEmployerApp.competenceLinguistique.home.title' },
        loadChildren: () => import('./competence-linguistique/competence-linguistique.module').then(m => m.CompetenceLinguistiqueModule),
      },
      {
        path: 'experience',
        data: { pageTitle: 'gesEmployerApp.experience.home.title' },
        loadChildren: () => import('./experience/experience.module').then(m => m.ExperienceModule),
      },
      {
        path: 'structure',
        data: { pageTitle: 'gesEmployerApp.structure.home.title' },
        loadChildren: () => import('./structure/structure.module').then(m => m.StructureModule),
      },
      {
        path: 'projet',
        data: { pageTitle: 'gesEmployerApp.projet.home.title' },
        loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule),
      },
      {
        path: 'diplome',
        data: { pageTitle: 'gesEmployerApp.diplome.home.title' },
        loadChildren: () => import('./diplome/diplome.module').then(m => m.DiplomeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
