import { Node, mergeAttributes } from "@tiptap/core";

const Div = Node.create({
    name: "div",
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
        return [{ tag: 'div[data-type="div"]' }];
    },
    renderHTML({ node, HTMLAttributes }) {

        console.log(HTMLAttributes);
        //  console.log(node.attributes.class);
        // HTMLAttributes.class = node.attrs.class;
        HTMLAttributes = {...HTMLAttributes, 'data-type': this.name }
        HTMLAttributes.class = 'uk-card uk-card-body'

        const color = HTMLAttributes.color
        const center = HTMLAttributes.center
        const column = HTMLAttributes.column

        switch (color) {
            case 'default':
                HTMLAttributes.class += ' uk-card-default'
                break;

            case 'primary':
                HTMLAttributes.class += ' uk-card-primary'
                break;
            case 'secondary':
                HTMLAttributes.class += ' uk-card-secondary'
                break;
            case 'tersary':
                HTMLAttributes.class += ' uk-card-tersary'
                break;

            default:
                HTMLAttributes.class += ' uk-card-default'
                break;
        }


        switch (center) {
            case 'center':
                HTMLAttributes.class += ' uk-margin-auto-left uk-margin-auto-right'
                break;

            case 'left':
                HTMLAttributes.class += ' uk-margin-auto-left'
                break;
            case 'right':
                HTMLAttributes.class += ' uk-margin-auto-right'
                break;

            default:
                HTMLAttributes.class += ''
                break;
        }

        switch (column) {
            case '2':
                HTMLAttributes.class += ' uk-child-width-1-2@m'
                    // HTMLAttributes = {...HTMLAttributes, 'uk-grid': '' }
                break;

            case '3':
                HTMLAttributes.class += ' uk-child-width-1-3@m'
                break;
            case '4':
                HTMLAttributes.class += ' uk-child-width-1-4@m'
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
            setDiv: (attributes) => ({ commands }) => {
                return commands.wrapIn("div", attributes);
            },
            toggleDiv: (attributes) => ({ commands }) => {
                return commands.toggleWrap("div", attributes);
            },
            unsetDiv: (attributes) => ({ commands }) => {
                return commands.lift("div");
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
        console.log('update', transaction)
        let needsToWrapTables = false;

        this.editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "div" && node.firstChild !== null) {
                if (node.firstChild.type.name !== "div") return;
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
            if (node.type.name === "div" && classes.includes(node.attrs.class)) {
                if (
                    node.firstChild !== null &&
                    node.content.lastChild.type.name == "paragraph"
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

export default Div;
export { Div };
