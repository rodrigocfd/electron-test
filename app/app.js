'use strict';

const {app, BrowserWindow} = require('electron');
const path = require('path');
const reload = require('electron-reload');
const isDev = require('electron-is-dev');

let win = null;

if (isDev) {
	const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
	reload(__dirname, {electron: electronPath});
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('ready', () => {
	win = new BrowserWindow({
		width: 500,
		height: 300,
		resizable: false,
		show: false
	});
	win.once('ready-to-show', () => win.show());
	win.on('closed', () => win = null);

	win.setMenu(null);
	win.loadFile('app/main.html');

	if (isDev) {
		win.webContents.openDevTools({detach: true});
	}
});
