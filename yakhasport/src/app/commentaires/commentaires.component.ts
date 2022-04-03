import { Component, OnInit } from '@angular/core';
import { Commentaires, CommentairesService } from './commentaires.service';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenu from '@tiptap/extension-bubble-menu';

import TextAlign from '@tiptap/extension-text-align';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss'],
})
export class CommentairesComponent implements OnInit {
  coments: Commentaires[];

  editor = new Editor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
  });

  newcomment = '<p>Hello, Tiptap!</p>';

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

  addComments(): void {}

  newsection(e): void {
    console.log(e);
    const node = document.createElement('DIV'); // Create a <li> node
    const textnode = document.createTextNode('Water'); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    node.classList.add('uk-section');
    const wheretoAdd = document.getElementById('comentid').firstChild;
    wheretoAdd.appendChild(node); // Append <li> to <ul> with id="myList"
    //  document.getElementById('comentid').classList.add('mydiv');
    // document.getElementById('comentid').classList.add('uk-section');
  }
}
