import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MenuComponent } from './additional/menu/menu.component';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { MainComponent } from './pages/main/main.component';
import { TestComponent } from './pages/test/test.component';
import { TestRegistrationComponent } from './pages/test-registration/test-registration.component';


import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

import {HttpTokenInterceptor} from "./servicesT/interceptor/http-token.interceptor";
import { MenuBookComponent } from './models/book/additional-component/menu-book/menu-book.component';
import { AccountComponent } from './modules/manga/pages/account/account.component';
import {MangaModule} from "./modules/manga/manga.module";



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    TestComponent,
    TestRegistrationComponent,
    ForgotPasswordComponent,
    MenuBookComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MangaModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
