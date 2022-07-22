import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';

export default Image.extend({
    name: 'custom-image',

    defaultOptions: {
        ...Image.options,
        sizes: ['small', 'medium', 'large', 'xlarge'],
        float: ['none', 'left', 'right'],
        center: ['center', 'left', 'right'],
        margin: ['none', 'small-right', 'small-left', 'right', 'left', 'large-left', 'large-right']
    },

    addAttributes() {
        return {
            ...Image.config.addAttributes(),
            size: {
                default: 'none',
                rendered: true
            },
            float: {
                default: 'none',
                rendered: true
            },
            center: {
                default: 'left',
                render: true,
            },
            margin: {
                default: 'none',
                render: true,
            }
        };
    },

    addCommands() {
        return {
            // This is unchanged from the original
            // Image setImage function
            // However, if I extended addComands in
            // the same way as addAttributes `this`
            // seemed to lose context, so I've just
            // copied it in here directly
            setImage:
                (options) =>
                ({ tr, dispatch }) => {
                    const { selection } = tr;
                    const node = this.type.create(options);

                    if (dispatch) {
                        tr.replaceRangeWith(selection.from, selection.to, node);
                    }

                    return true;
                },
            setSize:
                (attributes) =>
                ({ tr, dispatch }) => {
                    // Check it's a valid size option
                    if (!this.options.sizes.includes(attributes.size)) {
                        return false;
                    }

                    const { selection } = tr;

                    // We're calling, for example:
                    //
                    // editor
                    //   .chain()
                    //   .focus()
                    //   .setSize({ size: 'small' })
                    //   .run()
                    //
                    // from the bubble menu
                    // so `attributes` is { size: 'small' }
                    // which will add/overwrite the current
                    // `selection.node.attrs` attributes
                    // including, importantly, `src` :)

                    const options = {
                        ...selection.node.attrs,
                        ...attributes,
                    };

                    const node = this.type.create(options);

                    if (dispatch) {
                        tr.replaceRangeWith(selection.from, selection.to, node);
                    }
                },
        };
    },

    renderHTML({ node, HTMLAttributes }) {
        // When we render the HTML, grab the
        // size and add an appropriate
        // corresponding class

        const size = node.attrs.size;
        const float = node.attrs.float;
        const center = node.attrs.center;
        const margin = node.attrs.margin || 'none';
        // console.log('attirbs', node.attrs);
        // HTMLAttributes.class = ' custom-image-' + size;

        // HTMLAttributes.class = float !== 'none' ? ' uk-width-' + size + ' uk-float-' + float : ' uk-width-' + size;
        let marginClass = margin.split(' ');
        console.log(size);
        HTMLAttributes.class = ' uk-width-' + size;
        HTMLAttributes.class += margin === 'none' ? '' : marginClass.length === 1 ? ' uk-margin-' + margin : ' uk-margin-' + marginClass[0] + ' uk-margin-' + marginClass[1];
        const allClass = float === 'none' ? 'uk-margin-auto-right uk-margin-auto-left' : 'uk-float-' + float


        HTMLAttributes.size = node.attrs.size;
        HTMLAttributes.float = node.attrs.float;
        HTMLAttributes.center = node.attrs.center;
        HTMLAttributes.margin = node.attrs.margin || 'none';

        return [
            'div',
            { class: allClass, style: 'width: fit-content', 'data-type': 'custom-image' },
            // { class: 'uk-float-right', style: 'width: fit-content' },
            [
                'img',
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            ],

        ];
        /*  return [
             'img',
             mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
         ] */
    },

    /* addNodeView({HTMLAttributes}) {
      const dom = document.createElement('div')

      dom.classList.add('custom-image')
      dom.classList.add('uk-margin-left uk-margin-right')

      const img = document.createElement('img')


    } */
});
