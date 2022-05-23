import { Component, Input, OnInit } from '@angular/core';
import { Editor, mergeAttributes, Node } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';
import Heading from '@tiptap/extension-heading';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Gapcursor from '@tiptap/extension-gapcursor';

import CustomImage from '../custom-image';
import { News, NewsService } from '../news.service';
import { UserService } from 'src/app/shared/user.service';

const Grid = Node.create({
  name: 'grid', // unique name for the Node
  group: 'block', // belongs to the 'block' group of extensions
  selectable: true, // so we can select the video
  draggable: true, // so we can drag the video
  atom: true, // is a single unit
  contenteditable: true,
  addAttributes(): any {
    return {
      'uk-grid': {
        default: null,
      },
    };
  },

  parseHTML(): any {
    return [
      {
        tag: 'node-grid',
      },
    ];
  },

  renderHTML({ HTMLAttributes }): any {
    HTMLAttributes.class = 'uk-grid-match uk-child-width-1-3@m';
    return ['node-grid', mergeAttributes(HTMLAttributes)];
  },

  addNodeView(): any {
    return ({ editor, node }) => {
      const div = document.createElement('div');
      div.classList.add('node-grid');
      div.classList.add('uk-grid-match');
      div.classList.add('uk-child-width-1-3@m'); // + (editor.isEditable ? ' cursor-pointer' : '');
      div.setAttribute('uk-grid', '');
      div.setAttribute('contenteditable', 'true');
      /* const iframe = document.createElement('iframe');
      if (editor.isEditable) {
        iframe.className = 'pointer-events-none';
      }
      iframe.width = '640';
      iframe.height = '360';
      iframe.frameborder = "0";
      iframe.allowfullscreen = "";
      iframe.src = node.attrs.src;
      div.append(iframe); */
      const div1 = document.createElement('div');
      const p1 = document.createElement('p');
      p1.setAttribute('contenteditable', 'true');
      p1.classList.add('content');
      p1.innerHTML =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.1';
      div1.appendChild(p1);
      const div2 = document.createElement('div');
      const p2 = document.createElement('p');
      p2.innerHTML =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.2';
      div2.appendChild(p2);
      const div3 = document.createElement('div');
      const p3 = document.createElement('p');
      p3.innerHTML =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.3';
      div3.appendChild(p3);

      div.appendChild(div1);
      div.appendChild(div2);
      div.appendChild(div3);

      return {
        dom: div,
        contentDOM: div,
      };
    };
  },
});

@Component({
  selector: 'app-newsviewer',
  templateUrl: './newsviewer.component.html',
  styleUrls: ['./newsviewer.component.scss'],
})
export class NewsviewerComponent implements OnInit {
  @Input() content: News;
  @Input() contentid: string;
  @Input() editable: boolean;

  isLogged = false;

  editor = new Editor({
    editable: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      /* Image.configure({
        HTMLAttributes: {
          class: 'uk-width-medium',
          width: '480px',
          contenteditable: true,
        },
      }), */
      CustomImage.configure({
        HTMLAttributes: {
          class: 'uk-margin-left uk-margin-right',
          contenteditable: true,
        },
      }),
      Dropcursor,
      Heading.configure({
        HTMLAttributes: {
          class: 'uk-heading',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Gapcursor,
      Grid,
    ],
  });

  constructor(
    private readonly newsService: NewsService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('loggé: ', this.userService.isLogged());
    this.isLogged = this.userService.isLogged() === undefined ? false : true;
  }

  editer(): void {
    this.editor.options.editable = true;
  }

  editerValid(): void {
    const toUpdate: News = this.content;
    toUpdate.content = this.editor.getHTML();
    console.log(this.content.id);
    this.newsService.updateNews(this.content.id, toUpdate).subscribe(
      (res) => {
        console.log('updateok');
        this.editor.options.editable = false;
      },
      (err) => {
        console.log('erreur sauve: ', err.message);
      }
    );
  }

  supprimer(): void {
    this.newsService.deleteNews(this.content.id).subscribe(
      (res) => {},
      (err) => {
        console.log('erreur: ', err.message);
      }
    );
  }
}
