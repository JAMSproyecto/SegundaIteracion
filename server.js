'use strict';

// Se utiliza http dentro de la arquitectura
const Http = require('http');

// Se establece el puerto como punto de origen para acceder a la aplicación.
const Port = parseInt(process.argv[2] || 3000 || 3001, 10);

// Dependencia que permite crear un servidor estático
const ServeStatic = require('serve-static');

// Se exporta la conexión de nodejs
const Connect = require('connect');

const Nodemon = require('nodemon');

const Tiza = require('chalk');

const Script = './api/index.js';

Connect().use(ServeStatic(__dirname)).listen(Port, () => {
    process.stdout.write('\x1b[H\x1b[2J');
    console.log(Tiza.rgb(163, 84, 73).bgBlack(' /////////////////////////////////////'));
    console.log('');
    console.log(Tiza.rgb(236, 236, 236).bgBlack('      App :: localhost:') + Tiza.bold.rgb(185, 212, 49).bgBlack(Port) + Tiza.rgb(236, 236, 236).bgBlack('/') + Tiza.rgb(131, 218, 137).bgBlack('public') + Tiza.rgb(236, 236, 236).bgBlack('/'));
    console.log('');
    console.log(Tiza.rgb(236, 236, 236).bgBlack(' ++++++++++++++++++++++++++++++++++++'));
    console.log(Tiza.rgb(236, 236, 236).bgBlack(' +                                  +'));
    console.log(Tiza.rgb(236, 236, 236).bgBlack(' +          ' + Tiza.bold.rgb(105, 170, 176).bgBlack('node') + ' ' + Tiza.bold.rgb(241, 167, 115).bgBlack('server.js') + '          +'));
    console.log(Tiza.rgb(236, 236, 236).bgBlack(' +                                  +'));
    console.log(Tiza.rgb(236, 236, 236).bgBlack(' ++++++++++++++++++++++++++++++++++++'));

    Nodemon({
        script: Script,
        ext: 'js'
    });
    Nodemon.on('start', () => {
        console.log('');
        console.log('');
        console.log('');
        console.log(Tiza.rgb(180, 180, 180).bgBlack(` Hora: `) + Tiza.rgb(236, 236, 236).bgBlack(`${(new Date()).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}`));
        console.log('');
    });
    Nodemon.on('crash', () => {
        process.stdout.write('\x07');
        console.log('');
    });
});
