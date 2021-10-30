import { Component, OnInit } from '@angular/core';
import { Commentaires, CommentairesService } from './commentaires.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss'],
})
export class CommentairesComponent implements OnInit {
  coments: Commentaires[];

  constructor(private readonly commentairesService: CommentairesService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentairesService.getComments().subscribe(
      (res) => {
        this.coments = res;
      },
      (err) => {}
    );
  }
}
