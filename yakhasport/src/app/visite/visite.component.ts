import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

// import * as UIkit from 'uikit';

declare var UIkit: any;

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss'],
})
export class VisiteComponent implements OnInit, AfterViewInit {
  title = 'Visite - Yakhasport La Fabrik Fumel';

  listeaccueil = [
    ' ../../assets/visite/accueil/IMG-20201117-WA0003.jpg',
    ' ../../assets/visite/accueil/IMG-20201117-WA0004.jpg',
    ' ../../assets/visite/accueil/IMG-20201117-WA0005.jpg',
    ' ../../assets/visite/accueil/IMG-20201117-WA0006.jpg',
    ' ../../assets/visite/accueil/IMG-20201117-WA0007.jpg',
    ' ../../assets/visite/accueil/IMG-20201117-WA0008.jpg',
    ' ../../assets/visite/accueil/IMG-20201117-WA0009.jpg',
    ' ../../assets/visite/accueil/IMG-20201117-WA0010.jpg',
    ' ../../assets/visite/accueil/IMG-20201009-WA0013.jpg',
    '../../assets/visite/accueil/IMG-20201009-WA0015.jpg',
    '../../assets/visite/accueil/IMG-20201009-WA0014.jpg',
    ' ../../assets/visite/accueil/IMG-20201009-WA0016.jpg',
    ' ../../assets/visite/accueil/IMG-20201009-WA0017.jpg',
    ' ../../assets/visite/accueil/IMG-20201009-WA0018.jpg',
    ' ../../assets/visite/accueil/IMG-20201009-WA0026.jpg',
    ' ../../assets/visite/accueil/IMG-20201009-WA0019.jpg',
  ];

  listeespace = [
    '../../assets/visite/espace/IMG-20201117-WA0000.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0001.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0002.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0011.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0012.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0013.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0014.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0015.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0016.jpg',
    '../../assets/visite/espace/IMG-20201117-WA0017.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0024.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0006.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0025.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0027.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0028.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0035.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0001.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0000.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0007.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0004.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0003.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0030.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0031.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0032.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0034.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0033.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0008.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0009.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0010.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0011.jpg',
    '../../assets/visite/espace/IMG-20201009-WA0012.jpg',
  ];

  listeyoga = [
    ' ../../assets/visite/yoga/IMG-20201009-WA0029.jpg',
    '../../assets/visite/yoga/IMG-20201009-WA0038.jpg',
    '../../assets/visite/yoga/IMG-20201009-WA0039.jpg',
  ];

  listevestiaire = [
    ' ../../assets/visite/vestiaires/IMG-20201009-WA0002.jpg',
    '../../assets/visite/vestiaires//IMG-20201009-WA0020.jpg',
    '../../assets/visite/vestiaires/IMG-20201009-WA0021.jpg',
    ' ../../assets/visite/vestiaires/IMG-20201009-WA0022.jpg',
    ' ../../assets/visite/vestiaires/IMG-20201009-WA0023.jpg',
    ' ../../assets/visite/vestiaires/IMG-20201009-WA0036.jpg',
    ' ../../assets/visite/vestiaires/IMG-20201009-WA0037.jpg',
    ' ../../assets/visite/vestiaires/IMG-20201009-WA0040.jpg',
  ];

  private fragment: string;
  constructor(
    private readonly route: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: 'description',
      content:
        'Bienvenue dans la salle de sport yakhasport fumel "la fabrik", 1100m² d\'espaces dédiés à l\'activité sportive, Visite de la salle de sport La Fabrik Fumel, photos des salles, photos vestiaires, photos accueil',
    });
    this.fragment = this.route.snapshot.paramMap.get('id');
    // console.log(this.route.snapshot.url);
  }

  ngAfterViewInit(): void {
    // console.log(this.fragment);
    try {
      // document.querySelector('#' + this.fragment).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      UIkit.scroll('#' + this.fragment);
      /*  UIkit.mixin({
         target: '#' + this.fragment ,
         data: { target: '#' + this.fragment}
       }, 'scroll'); */
    } catch (e) {
      console.log(e);
    }
  }
}
