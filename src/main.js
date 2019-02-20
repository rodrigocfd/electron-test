'use strict';

const {ipcRenderer} = require('electron');
const {dialog} = require('electron').remote;
const fs = require('fs');
const $ = require('jquery');

$(document).on('DOMContentLoaded', () => {
	$('#info').text(`Node ${process.version}`);

	$('#btn').on('click', e => {
		console.log('Clicked', e);
		ipcRenderer.send('show-msg', {msg: 'Hello dude'});
	});

	$('#loadFile').on('click', e => {
		dialog.showOpenDialog({
			properties: ['openFile']
		}, filePaths => {
			if (filePaths !== undefined) {
				fs.readFile(filePaths[0], 'utf-8', (err, data) => {
					if (!err) {
						$('#fileOut').val(data);
					}
				});
			}
		});
	});
});
