"use strict";
const CodeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown");

const storage = require("./storage");

document.addEventListener("DOMContentLoaded", () => {
	const editor = new CodeMirror(document.querySelector(".editor"), {
		lineNumbers: true,
		lineWrapping: true,
		mode: "markdown",
		value: storage.get()
	});

	window.addEventListener("beforeunload", () => {
		storage.set(editor.getValue());
	});

	// Place the cursor at the end of the document
	// instead of the default 0:0 pos
	const pos = { line: 0, ch: editor.getValue().length};
	editor.setCursor(pos);
	editor.focus();
});
