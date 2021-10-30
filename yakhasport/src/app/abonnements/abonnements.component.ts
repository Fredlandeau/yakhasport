import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-abonnements',
  templateUrl: './abonnements.component.html',
  styleUrls: ['./abonnements.component.scss']
})
export class AbonnementsComponent implements OnInit {
  title = 'Abonnements et tarif - Yakhasport La Fabrik Fumel';

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag(
      { name: 'description', content: 'Tarifs et abonnements de la salle de sport La Fabrik Fumel, adresse de la salle' }
    );
  }

}
