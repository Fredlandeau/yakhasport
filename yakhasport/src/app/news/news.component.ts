import { Component, OnInit } from '@angular/core';

import { Editor, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';
import Heading from '@tiptap/extension-heading';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import CustomImage from './custom-image';

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
    ],
  });

  newcomment = '<p>Hello, Tiptap!</p>';

  constructor() {}

  ngOnInit(): void {}

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
}
