"use strict";
const CodeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown");

const storage = require("./storage");

document.addEventListener("DOMContentLoaded", () => {
	const editor = new CodeMirror(document.querySelector(".editor"), {
		autofocus: true,
		lineWrapping: true,
		mode: "markdown",
		theme: "huxley-light",
		value: storage.get()
	});

	window.addEventListener("beforeunload", () => {
		storage.set(editor.getValue());
	});
});
