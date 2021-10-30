import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { GoogleMapsModule } from '@angular/google-maps';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

import { AbonnementsComponent } from './abonnements/abonnements.component';
import { CoursComponent } from './cours/cours.component';
import { VisiteComponent } from './visite/visite.component';

import { MapComponent } from './map/map.component';

import { CovidComponent } from './covid/covid.component';
import { CommentairesComponent } from './commentaires/commentaires.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxTiptapModule } from 'ngx-tiptap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    VisiteComponent,
    AbonnementsComponent,
    CoursComponent,
    MapComponent,
    CovidComponent,
    CommentairesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // GraphQLModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    SharedModule,
    NgxTiptapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
