'use strict';
let menuPrincipal =()=> {
	let x = document.getElementById('menuPrincipal');
	if (x.className === 'header') {
		x.className += ' header--responsive';
	} else {
		x.className = 'header';
	}
};
