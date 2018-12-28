'use strict';

const {app, BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path');
const reload = require('electron-reload');
const isDev = require('electron-is-dev');

let win = null;

if (isDev) { // hot reloading
	const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
	reload(__dirname, {electron: electronPath});
}

function createWindow() {
	win = new BrowserWindow({
		icon: 'assets/palmtree.png',
		width: 500,
		height: 400,
		resizable: false,
		show: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	win.once('ready-to-show', () => win.show());
	win.on('closed', () => win = null);

	win.setMenu(null);
	win.loadFile('app/main.html');

	if (isDev) {
		win.webContents.openDevTools({detach: true});
	}
}

app.on('ready', createWindow);

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.on('show-msg', (e, arg) => {
	dialog.showMessageBox({
		title: 'Hey dude',
		message: arg.msg,
		buttons: ['OK']
	});
});
