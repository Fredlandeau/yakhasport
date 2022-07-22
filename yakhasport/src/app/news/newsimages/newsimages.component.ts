import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-newsimages',
  templateUrl: './newsimages.component.html',
  styleUrls: ['./newsimages.component.scss'],
})
export class NewsimagesComponent implements OnInit {
  Images: any[];

  @Output() Selected = new EventEmitter<any>();

  imageselected: string;

  constructor(
    private readonly newsService: NewsService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.newsService.getAllImages2().subscribe(
      (res) => {
        console.log('all images: ', res);
        this.Images = res;
      },
      (err) => {
        console.log(err.message);
      }
    );
    /* this.newsService.getOneImage('DSC_0119 - Copie-1515.JPG').subscribe(
      (res) => {
        console.log('image', res);
      },
      (err) => {
        console.log('erreur images :', err.message);
      }
    ); */
  }

  selected(image): void {
    console.log(image);
    this.Selected.emit(image);
    this.imageselected = image.file;
  }

  sendFile(e): void {
    const fileToUpload = e.target.files[0];
    if (!fileToUpload) {
      return;
    }
    this.newsService
      .addFile(fileToUpload)
      .toPromise()
      .then((res) => {
        console.log(res);
        this.getImages();
        e.target.files[0].name = null;
      });
  }
}
