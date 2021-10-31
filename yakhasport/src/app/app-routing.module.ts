import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AbonnementsComponent } from './abonnements/abonnements.component';
import { CoursComponent } from './cours/cours.component';
import { LoginComponent } from './login/login.component';
import { VisiteComponent } from './visite/visite.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'visite',
  },
  {
    path: 'visite',
    component: VisiteComponent,
  },
  {
    path: 'visite/:id',
    component: VisiteComponent,
  },
  {
    path: 'abonnements',
    component: AbonnementsComponent,
  },
  {
    path: 'abonnements/:id',
    component: AbonnementsComponent,
  },
  {
    path: 'cours',
    component: CoursComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: VisiteComponent },
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
