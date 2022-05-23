const Paragraphs = Node.create({
    name: 'paragraphs',
    priority: 1000,
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    group: 'block',
    content: 'inline*',
    parseHTML() {
        return [
            { tag: 'p' },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
        return {
            setParagraphs: () => ({ commands }) => {
                return commands.setNode('paragraphs');
            },
        };
    },
    addKeyboardShortcuts() {
        return {
            'Mod-Alt-22': () => this.editor.commands.setParagraphs(),
        };
    },
});

export { Paragraphs, Paragraphs as default };
