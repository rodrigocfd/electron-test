'use strict';

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('info').textContent = `Node ${process.version}`;

	const btn = document.getElementById('btn');
	btn.addEventListener('click', e => {
		console.log('Clicked', e);
	});
});
