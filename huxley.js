"use strict";
const {readFile, writeFile} = require("fs");

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

	if (process.platform === "darwin") {
		const Titlebar = require("./Titlebar");
		const titlebar = new Titlebar("Huxley");

		document.body.classList.add("platform-macos");
		document.body.appendChild(titlebar.getElement());
	}

	window.huxley = {
		readFile: (path) => {
			readFile(path, "utf8", (err, content) => {
				if (err) {
					editor.setValue(err.message);
				} else {
					editor.setValue(content);
				}
			});
		},
		writeFile: (path) => {
			writeFile(path, editor.getValue(), "utf8", (err) => {
				if (err) {
					editor.setValue(err.message);
				}
			});
		}
	};

	window.addEventListener("beforeunload", () => {
		storage.set(editor.getValue());
	});
});
