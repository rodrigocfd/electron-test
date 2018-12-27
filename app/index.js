'use strict';

const {app, BrowserWindow} = require('electron');

let win = null;

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
	win.loadFile('app/index.html');
});
