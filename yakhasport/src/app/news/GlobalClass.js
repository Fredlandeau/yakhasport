import { Extension } from "@tiptap/core";

export default Extension.create({
    name: "global-class",
    onCreate() {
        // The editor is ready.
    },
    onUpdate() {
        //
    },
    onSelectionUpdate({ editor }) {
        // The selection has changed.
    },
    onTransaction({ transaction }) {
        // The editor state has changed.
    },
    onFocus({ event }) {
        // The editor is focused.
    },
    onBlur({ event }) {
        // The editor isn’t focused anymore.
    },
    onDestroy() {
        // The editor is being destroyed.
    },
    addGlobalAttributes() {
        return [{
            types: ["paragraph", "div", "link", "bulletList", "horizontalRule"],
            attributes: {
                class: {
                    default: null
                }
            }
        }];
    }
});
