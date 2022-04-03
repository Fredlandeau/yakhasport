import { Component, OnInit } from '@angular/core';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { CoursService } from './cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit {
  title = 'Planning des cours - Yakhasport La Fabrik Fumel';

  planning: any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private readonly coursService: CoursService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: 'description',
      content:
        'Planning des cours de la salle de sport La Fabrik Fumel, videos de cours',
    });

    this.getPlanning();
  }

  getPlanning(): void {
    this.coursService
      .getPlanning()
      .toPromise()
      .then((res) => {
        const blob = new Blob([res], { type: 'img/jpg' });
        const unsafeImg = URL.createObjectURL(blob);
        this.planning = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      });
  }
}
