"use strict";
const electron = require("electron");

const {app} = electron;

let mainWindow;

const createMainWindow = () => {
	mainWindow = new electron.BrowserWindow({
		minWidth: 440,
		title: app.getName()
	});
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
