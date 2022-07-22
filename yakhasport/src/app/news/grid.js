import Paragraph from '@tiptap/extension-paragraph';
import { mergeAttributes, Node } from '@tiptap/core';

const Grid = Node.create({
    name: "grid",
    selectable: true,

    addOptions() {
        return {
            HTMLAttributes: {}
        };
    },
    addAttributes() {
        return {
            column: {
                default: 'default',
                rendered: true
            },
            color: {
                default: 'default',
                rendered: true
            },
            center: {
                default: 'default',
                render: true,
            }
        };
    },
    content: "block*",
    group: "block",
    defining: true,
    draggable: true,
    parseHTML() {
        return [{ tag: 'div[data-type="grid"]' }];
    },
    renderHTML({ node, HTMLAttributes }) {

        console.log(HTMLAttributes);
        //  console.log(node.attributes.class);
        // HTMLAttributes.class = node.attrs.class;
        // HTMLAttributes.class = 'uk-card uk-card-body'


        const color = HTMLAttributes.color
        HTMLAttributes = {...HTMLAttributes, 'uk-grid': '', 'data-type': this.name }
        HTMLAttributes.class = 'uk-child-width-expand@s uk-padding'

        switch (color) {
            case 'default':
                HTMLAttributes.class += ''
                break;

            case 'primary':
                HTMLAttributes.class += ' uk-background-primary'
                break;
            case 'secondary':
                HTMLAttributes.class += ' uk-background-secondary'
                break;
            case 'tersary':
                HTMLAttributes.class += ' uk-card-tersary'
                break;

            default:
                HTMLAttributes.class += ''
                break;
        }


        return [
            "div",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0
        ];
    },
    addCommands() {
        return {
            setGrid: (attributes) => ({ commands }) => {
                return commands.wrapIn("grid", attributes);
            },
            toggleGrid: (attributes) => ({ commands }) => {
                return commands.toggleWrap("grid", attributes);
            },
            unsetGrid: (attributes) => ({ commands }) => {
                return commands.lift("grid");
            }
        };
    },
    onUpdate({ HTMLAttributes }) {
        const classes = [
            "table-responsive",
            "aspect-w-16 aspect-h-9",
            "resp-container"
        ];
        // console.log(node.attrs.class)
        // console.log(HTMLAttributes);

        return;
        const transaction = this.editor.state.tr;
        let needsToWrapTables = false;

        this.editor.state.doc.descendants((node, pos) => {
            console.log(transaction);
            console.log('content', node.content)

            if (node.type.name === "div" && node.firstChild !== null) {
                if (node.firstChild.type.name !== "table") return;
                if (node.attrs.class == null) {
                    needsToWrapTables = true;
                    transaction.setNodeMarkup(pos, undefined, {
                        ...node.attrs,
                        class: "table-responsive"
                    });
                    return true;
                }
            }
            return false;
        });

        if (needsToWrapTables) {
            transaction.setMeta("preventUpdate", true);
            this.editor.view.dispatch(transaction);
            transaction.setMeta("preventUpdate", false);
        }

        this.editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "grid" && classes.includes(node.attrs.class)) {
                if (
                    node.firstChild !== null &&
                    node.content.lastChild.type.name == "div"
                ) {



                    transaction.replaceWith(
                        pos,
                        pos + node.nodeSize,
                        node.content.lastChild
                    );
                    this.editor.view.dispatch(transaction);
                    return true;
                }

                if (
                    node.firstChild !== null &&
                    node.firstChild.type.name == "paragraph"
                ) {
                    transaction.replaceWith(pos, pos + node.nodeSize, node.content);
                    this.editor.view.dispatch(transaction);
                    return true;
                }

                if (node.childCount == 0) {
                    transaction.deleteRange(pos, pos + node.nodeSize);
                    this.editor.view.dispatch(transaction);
                    return true;
                }
                return false;
            }
        });
    }
});

export default Grid;
export { Grid };
