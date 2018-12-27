'use strict';

const {ipcRenderer} = require('electron');
const {dialog} = require('electron').remote;
const fs = require('fs');

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('info').textContent = `Node ${process.version}`;

	const btn = document.getElementById('btn');
	btn.addEventListener('click', e => {
		console.log('Clicked', e);
		ipcRenderer.send('show-msg', {msg: 'Hello dude'});
	});

	const btnLoadFile = document.getElementById('loadFile');
	btnLoadFile.addEventListener('click', e => {
		dialog.showOpenDialog({
			properties: ['openFile']
		}, filePaths => {
			if (filePaths !== undefined) {
				fs.readFile(filePaths[0], 'utf-8', (err, data) => {
					if (!err) {
						document.getElementById('fileOut').value = data;
					}
				});
			}
		});
	});
});
