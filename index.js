const {app, BrowserWindow} = require('electron');

let win = null;

app.on('ready', () => {
	win = new BrowserWindow({width: 500, height: 300});
	win.loadFile('index.html');

	win.on('closed', () => {
		win = null;
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
