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
import { LoginComponent } from './login/login.component';
import { CommentairesComponent } from './commentaires/commentaires.component';

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
    LoginComponent,
    CommentairesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // GraphQLModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
