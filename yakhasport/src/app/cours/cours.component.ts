import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../shared/user.service';
import { CoursService } from './cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit {
  title = 'Planning des cours - Yakhasport La Fabrik Fumel';

  planning: any;

  /*  @ViewChild('planning', { static: false }) planninElt: ElementRef;
  Planning; */

  isLoadingImg: boolean;
  isLogged = false;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private readonly coursService: CoursService,
    private readonly sanitizer: DomSanitizer,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({
      name: 'description',
      content:
        'Planning des cours de la salle de sport La Fabrik Fumel, videos de cours',
    });

    this.getPlanning();
    this.isLogged = this.userService.isLogged() === undefined ? false : true;
  }

  getPlanning(): void {
    this.isLoadingImg = true;
    this.coursService
      .getPlanning()
      .toPromise()
      .then((res) => {
        const blob = new Blob([res], { type: 'img/jpg' });
        const unsafeImg = URL.createObjectURL(blob);
        this.planning = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        this.isLoadingImg = false;
      });
  }

  sendFile(e): void {
    const fileToUpload = e.target.files[0];
    this.coursService
      .addFile(fileToUpload)
      .toPromise()
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  }
}
