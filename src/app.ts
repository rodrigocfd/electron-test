import {app, BrowserWindow, dialog, ipcMain} from 'electron';
const isDev = require('electron-is-dev');

let win: any = null;

function createWindow(): void {
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
	win.on('closed', (): void => win = null);

	win.setMenu(null);
	win.loadFile('src/main.html');

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

ipcMain.on('show-msg', (e: any, arg: any) => {
	dialog.showMessageBox({
		title: 'Hey dude',
		message: arg.msg,
		buttons: ['OK']
	});
});
