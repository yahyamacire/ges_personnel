import { Route } from '@angular/router';
import { RegisterComponent } from './../../app/account/register/register.component';
import { LoginComponent } from './login.component';

export const LOGIN_ROUTE: Route = {
  path: '',
  component: LoginComponent,
  data: {
    pageTitle: 'login.title',
  },
  
  
};

