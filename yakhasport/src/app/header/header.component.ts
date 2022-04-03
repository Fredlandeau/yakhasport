import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';

import { Location } from '@angular/common';

import { startWith, filter, map } from 'rxjs/operators';

const headercontent = [
  {
    url: '/',
    slogan: 'Le sport fait du bien',
    slogan2: 'Nous respectons les gestes barriéres',
    imgurl: '../../assets/visite/espace/IMG-20201009-WA0024.jpg',
  },
  {
    url: '/visite',
    slogan: 'Le sport fait du bien',
    slogan2: 'Salle entiérement automatisée de 6h à 23h',
    imgurl: '../../assets/visite/espace/IMG-20201009-WA0024.jpg',
  },
  {
    url: '/abonnements',
    slogan: 'Parrainez et gagnez des avantages',
    slogan2: 'Des formules pour tous',
    imgurl: '../../assets/visite/accueil/IMG-20201117-WA0007.jpg',
  },
  {
    url: '/cours',
    slogan: 'Nos cours collectifs vous motiveront',
    slogan2: 'Nos coachs sont dynamiques',
    imgurl: '../../assets/visite/espace/IMG-20201009-WA0003.jpg',
  },
  {
    url: '/connexion',
    slogan:
      'Vous souhaitez commenter, vous êtes administrateur, alors connectez-vous',
    slogan2: 'Créez un compte pour rester en contact',
    imgurl: '../../assets/visite/accueil/IMG-20201117-WA0007.jpg',
  },
  {
    url: '/news',
    slogan: 'Les derniéres news de yakhasport Fumel',
    slogan2: 'Les nouveautés',
    imgurl: '../../assets/visite/accueil/IMG-20201009-WA0017.jpg',
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  fragment: any;
  currentRouteURL: any;
  toDisplay: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {
    this.router.events.subscribe((res) => {
      // console.log(res);

      if (res instanceof NavigationEnd) {
        this.currentRouteURL = res;

        console.log(res.url.lastIndexOf('/'));
        if (res.url.lastIndexOf('/') > 0) {
          this.currentRouteURL.url = res.url.replace(
            res.url.substring(res.url.lastIndexOf('/'), res.url.length),
            ''
          );
          if (this.currentRouteURL.url.lastIndexOf('#') > 0) {
            this.currentRouteURL.url = this.currentRouteURL.url.replace(
              res.url.substring(
                this.currentRouteURL.url.lastIndexOf('#'),
                this.currentRouteURL.url.length
              ),
              ''
            );
          }
        }
        if (res.url.lastIndexOf('#') > 0) {
          this.currentRouteURL.url = res.url.replace(
            res.url.substring(res.url.lastIndexOf('#'), res.url.length),
            ''
          );
        }
        console.log(this.currentRouteURL);
        this.toDisplay = headercontent.find(
          (elt) => elt.url === this.currentRouteURL.url
        );
        console.log(this.toDisplay);
      }
    });
  }

  ngOnInit(): void {}
}
