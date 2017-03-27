"use strict";
const electron = require("electron");

const {app} = electron;

let mainWindow;

const createMainWindow = () => {
	const options = {
		minWidth: 440,
		title: app.getName()
	};

	if (process.platform === "darwin") {
		options.titleBarStyle = "hidden-inset";
	}

	mainWindow = new electron.BrowserWindow(options);
	mainWindow.loadURL("file://" + __dirname + "/index.html");
	mainWindow.once("closed", () => mainWindow = null);
};

app.on("activate", () => {
	if (!mainWindow) {
		createMainWindow();
	}
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.once("ready", createMainWindow);
