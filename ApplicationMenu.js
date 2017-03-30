"use strict";
const {app, dialog, Menu, shell} = require("electron");

const defaultMenu = require("electron-default-menu");

const FILTERS = [
	{name: "Text Documents", extensions: ["md", "txt"]}
];

const exportDocument = (item, browserWindow) => {
	const options = {
		filters: FILTERS
	};
	const callback = (path) => {
		if (typeof path !== "string") {
			return;
		}

		browserWindow.webContents
			.executeJavaScript("huxley.writeFile('" + path + "')", true);
	};

	try {
		dialog.showSaveDialog(browserWindow, options, callback);
	} catch (err) {
		console.error(err.stack); // eslint-disable-line
	}
};

const importDocument = (item, browserWindow) => {
	const options = {
		filters: FILTERS,
		properties: [
			"openFile"
		]
	};
	const callback = (paths) => {
		if (paths.length === 0 || paths.length > 1) {
			return;
		}

		const path = paths.pop();
		browserWindow.webContents
			.executeJavaScript("huxley.readFile('" + path + "')", true);
	};

	try {
		dialog.showOpenDialog(browserWindow, options, callback);
	} catch (err) {
		console.error(err.stack); // eslint-disable-line
	}
};

const menu = defaultMenu(app, shell);
menu.splice(1, 0, {
	label: "File",
	submenu: [
		{
			label: "Import Document",
			accelerator: "CmdOrCtrl+O",
			click: importDocument
		},
		{
			label: "Export Document",
			accelerator: "CmdOrCtrl+Shift+S",
			click: exportDocument
		},
	],
});

module.exports = Menu.buildFromTemplate(menu);
