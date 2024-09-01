import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {TestComponent} from "./pages/test/test.component";
import {TestRegistrationComponent} from "./pages/test-registration/test-registration.component";

import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";


const routes: Routes = [
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'login',
    component: TestComponent
  },
  {
    path: 'register',
    component: TestRegistrationComponent
  },
  {
    path: 'manga',
    loadChildren: () => import('./modules/manga/manga.module').then(m => m.MangaModule)

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
