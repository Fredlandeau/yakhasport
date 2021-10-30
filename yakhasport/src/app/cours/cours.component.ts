import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { CoursService } from './cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss'],
})
export class CoursComponent implements OnInit {
  title = 'Planning des cours - Yakhasport La Fabrik Fumel';

  @ViewChild('planning', { static: false }) planninElt: ElementRef;
  Planning;
  isLoadingImg: boolean;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private readonly location: Location,
    private readonly coursService: CoursService
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

  getPlanning(): Promise<void> {
    this.isLoadingImg = true;
    return this.coursService
      .getPlanning()
      .toPromise()
      .then((img) => {
        // console.log(img);
        /* const blob = new Blob([img]);
        const objectURL = URL.createObjectURL(blob);
        this.planninElt.nativeElement.src = objectURL; */
        this.createImageFromBlob(img);
        this.isLoadingImg = false;
      });
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.Planning = reader.result;
        // console.log(this.Planning);
        /* const blob = new Blob([this.Planning]);
        const objectURL = URL.createObjectURL(blob);
        this.planninElt.nativeElement.src = objectURL; */
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
