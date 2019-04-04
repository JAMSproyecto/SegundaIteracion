'use strict';

const Tiza = require('chalk');
const ModelUsuarios = require('./../usuarios/usuario.model');

module.exports.verificar_credenciales = async (arr, res) => {

    try {
        const Filtros = {pin: arr.pin};
        const Esconder = {_id: 0};

        const resultado = await ModelUsuarios.findOne(Filtros, Esconder).select('activo correo').limit(1);

        const cantidad = Object.keys(resultado).length;
        if (cantidad > 0) {

            if (resultado['activo'] === true) {
                res.json({
                    success: true,
                    message: 'El pin ingresado ya fué validado con éxito'
                });
            } else {
//Si se encontró el pin y no está activo, entonces inserte la contraseña:


                const Filtro = {correo: resultado['correo']};
                const NuevosValores = {$set: {contrasena: arr.contrasenna, pin: ''}};

                ModelUsuarios.updateOne(Filtro, NuevosValores, (err) => {
                    if (err) {
                        console.log(Tiza.bold.yellow.bgBlack('Ocurrió un error al guardar la contraseña: ' + err));
                        res.json({
                            success: false,
                            message: 'Error al guardar la contraseña'
                        });
                    } else {
                        res.json({
                            success: true,
                            message: 'La contraseña se guardó exitosamente'
                        });
                    }
                });

            }
        } else {
            res.json({
                success: false,
                message: 'El pin ingresado no es válido'
            });
        }

    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al verificar las credenciales:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al verificar las credenciales'
        });
    }

};
