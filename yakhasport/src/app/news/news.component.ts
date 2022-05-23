import { Component, OnInit } from '@angular/core';

import {
  AnyCommands,
  Editor,
  Extension,
  mergeAttributes,
  Node,
} from '@tiptap/core';
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

import CustomImage from './custom-image';
// import Grid from './grid';
// import Paragraphs from './gris';

import { CommentairesService } from '../commentaires/commentaires.service';
import { News, NewsService } from './news.service';

/* export const Grid = Node.create({
  name: 'grid',
  priority: 1000,
  group: 'block',
  content: 'inline*',
  addCommands(): AnyCommands {
    return {
      setGrids:
        (options) =>
        ({ tr, dispatch }) => {
          const { selection } = tr;
          const node = this.type.create(options);

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        },
      setGrid:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      addgrid:
        () =>
        ({ commands }) => {
          return commands.setNode('grid');
        },
    };
  },
  parseHTML(): any {
    return [{ tag: 'div[uk-grid]' }];
  },
  renderHTML({ node, HTMLAttributes }): any {

    const size = node.attrs.size;
    const float = node.attrs.float;
    console.log('attirbs', node.attrs);


    HTMLAttributes.class = 'uk-grid-match uk-child-width-1-3@m';

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

export default class Grid2 extends Extension {
  name: 'grid2';
  addCommands() {
    return {
      mycomand:
        () =>
        ({ commands }) => {
          return commands.setNode('grid');
        },
    };
  }
}

const Image2 = Node.create({
  name: 'image',
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? 'inline' : 'block';
  },
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [
      { tag: 'div[uk-grid]' },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
  addCommands() {
    return {
      setImage2:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
}); */

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
      // div.setAttribute('contenteditable', 'true');
      div.contentEditable = 'true';
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

      // div1.setAttribute('contenteditable', 'true');
      div1.contentEditable = 'true';
      // div1.classList.add('content');
      p1.contentEditable = 'true';
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

      this.editor.chain().focus().setParagraph().run();

      return {
        dom: div,
        // contentDOM: div1,
      };
    };
  },
});

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  editor = new Editor({
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
      Grid.configure({
        HTMLAttributes: {
          contenteditable: true,
        },
      }),
      /* new Grid2(),
      Image2, */
    ],
  });

  newcomment = '<p>Nouvel article!</p>';
  AllNews: News[];

  constructor(private readonly newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getAllNews().subscribe(
      (res) => {
        this.AllNews = res;
        console.log(this.AllNews);
      },
      (err) => {
        console.log('erreur news: ', err.message);
      }
    );
  }

  sizeImage(): void {
    /*  this.editor.extensionManager.extensions = [
      Image.configure({
        HTMLAttributes: {
          class: 'uk-image',
          width: '280px',
        },
      }),
    ]; */
    // this.editor.commands.insertContent('<p>blabala</p>');
    this.editor.options.editable = true;
    this.editor.view.update(this.editor.view.props);
    // this.editor.commands.updateAttributes('img', { width: '280px' });
    // this.editor.setOptions({ editable: true });
    /* this.editor
      .chain()
      .focus()
      .setNode('image', {
        HTMLAttributes: {
          class: 'uk-width-small',
        },
      })
      .run(); */

    // console.log(this.editor.chain().focus());

    this.editor
      .chain()
      .focus()
      .updateAttributes('custom-image', { size: 'medium', float: 'left' })
      .run();
    //  this.editor.chain().focus().setNode('heading', { level: 1 }).run();
    // this.editor.chain().focus().
    // this.editor.
    // this.editor.chain().focus().setImage({ size: 'medium' }).run();
    // this.editor.commands.updateAttributes('image', { size: 'medium' });
  }

  saveContent(): void {
    console.log('var:', this.newcomment);

    console.log('html: ', this.editor.getHTML());
    console.log('JSON', this.editor.getJSON());
    const contentToAdd = {
      date: new Date(),
      content: this.editor.getHTML(),
      type: 'news',
      publie: true,
    };
    this.newsService.addNews(contentToAdd).subscribe(
      (res) => {
        console.log('ajouté: ', res);
      },
      (err) => {
        console.log('erreur:', err.message);
      }
    );
  }

  AddGrid(): void {
    const toAdd = `<div class="node-grid uk-grid-match uk-child-width-1-3@m" uk-grid>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
    </div>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
    </div>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
    </div>
    </div>`;

    const toAdd2 = `'<node-grid>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
    </div>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
    </div>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
    </div>
    </node-grid>`;
    const toadd = '<node-grid></node-grid>';
    this.editor.chain().focus().insertContent(toadd).run();
    // this.editor.chain().focus().insertContent('grid').run();
  }
}
