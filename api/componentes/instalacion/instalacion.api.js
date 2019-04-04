'use strict';

const Tiza = require('chalk');
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');
const ModelBitacora = require('./../bitacora_transaccional/bitacora.model');
const ModelCEduNiveles = require('./../centro_educativo_niveles/CEduNiveles.model');

const ModelUsuario = require('./../usuarios/usuario.model');
const ModelAdmin = require('./../administrador/admin.model');
const ConfigAdmin = require('./../administrador/config_usuario_admin') || {};

const ArrayNiveles = ['Preescolar', 'Primaria', 'Secundaria', 'Superior'];
const ArrayCantNiveles = ArrayNiveles.length;

/**
 * Función para insertar en la bitácora
 * @param  {String} pRealizadaPor Sólo acepta: 'Instalador'|'SuperAdmin'|'CentroEducativo'|'PadreFamilia'.
 * @param  {String} pAccion Descripción de lo que se va a registrar.
 * @return {Boolean}
 */
let insertarBitacora = async (pRealizadaPor, pAccion) => {
    try {
        let bitacora_nuevo = new ModelBitacora({
            realizadaPor: pRealizadaPor || '',
            accion: pAccion || '',
            fecha: ObtenerFecha.get() || ''
        });
        let guardarAccion = await bitacora_nuevo.save();
        console.log(`Se registró en la bitácora: ${pAccion}`);
    } catch (err) {
        console.log(`Error al registrar en la bitácora '${pAccion}':`);
        console.log(err.message);
        return false;
    }
    return true;
};

/**
 * Función para insertar niveles
 * @return {Boolean}
 */
let insertarNiveles = async () => {

    let i = 0;
    for (i; i < ArrayCantNiveles; ++i) {
        try {
            let nivel_nuevo = new ModelCEduNiveles({
                nivel: ArrayNiveles[i]
            });
            let guardarNivel = await nivel_nuevo.save();
            console.log(Tiza.bold.white.bgBlack(`Se instaló el nivel : ${guardarNivel.nivel}`));
        } catch (err) {
            console.log(Tiza.bold.yellow.bgBlack(`Error al instalar '${ArrayNiveles[i]}':`));
            console.log(Tiza.bold.yellow.bgBlack(err.message));
            return false;
        }
    }
    return true;
};

/**
 * Función para insertar el usuario administrador
 * @return {Boolean}
 */
let insertarAdministrador = async () => {
    try {
        const vFecha = ObtenerFecha.get() || '';

        let admin_nuevo = new ModelAdmin({
            correo: ConfigAdmin.correo,
            nombre1: ConfigAdmin.nombre1,
            nombre2: ConfigAdmin.nombre2,
            apellido1: ConfigAdmin.apellido1,
            apellido2: ConfigAdmin.apellido2,
            telefono: ConfigAdmin.telefono,
            extension: ConfigAdmin.extension,
            puesto: ConfigAdmin.puesto
        });
        let guardarAdmin = await admin_nuevo.save();

        let registroUsuario = new ModelUsuario();
        registroUsuario.correo = ConfigAdmin.correo;
        registroUsuario.pin = 'NULL';
        registroUsuario.tipo = 'SuperAdmin';
        registroUsuario.fechaCreado = vFecha;
        registroUsuario.fechaActualizado = vFecha;
        registroUsuario.contrasena = ConfigAdmin.contrasena;
        registroUsuario.activo = true;

        let guardarUsuario = await registroUsuario.save();


        console.log(Tiza.bold.white.bgBlack(`Se instaló el usuario administrador`));
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack(`Error al instalar el usuario administrador:`));
        console.log(Tiza.bold.yellow.bgBlack(err.message));
        return false;
    }
    return true;
};

module.exports.instalacion = async (req, res) => {
    if (req === 'RWwgU2XDsW9yIGVzIG1pIGx1eiB5IG1pIHNhbHZhY2nDs24uIChTYWxtbyAyNywxKQ==') {
        try {
            const cantNiveles = await ModelCEduNiveles.find().count();
            let respuesta = [];
            if (cantNiveles < 1) {
                const Resultado = await insertarNiveles();
                if (Resultado === true) {

                    const log = await insertarBitacora('Instalador', `Se instalaron los siguientes niveles de los centros educativos: ${ArrayNiveles.join(', ')}`);

                    respuesta.push({
                        success: true,
                        message: 'Los niveles se instalaron correctamente'
                    });
                } else {
                    const log = await insertarBitacora('Instalador', `Error al instalar los siguientes niveles de los centros educativos: ${ArrayNiveles.join(', ')}`);
                    respuesta.push({
                        success: false,
                        message: 'Los niveles no se pudieron terminar de instalar'
                    });
                }
            } else {
                if (cantNiveles < ArrayCantNiveles) {
                    respuesta.push({
                        success: true,
                        message: 'Existen niveles instalados, pero no todos'
                    });
                } else {
                    respuesta.push({
                        success: true,
                        message: 'Los niveles ya están instalados'
                    });
                }
            }


            //Instalar el administrador.

            //validamos si ya fué creado:
            const cantAdmins = await ModelAdmin.find().count();

            if (cantAdmins > 0) {
                respuesta.push({
                    success: true,
                    message: 'El usuario administrador ya se encuentra instalado'
                });
            } else {
                const ResultadoAdmin = await insertarAdministrador();
                if (ResultadoAdmin === true) {
                    respuesta.push({
                        success: true,
                        message: 'El usuario administrador se instaló correctamente'
                    });
                } else {
                    respuesta.push({
                        success: false,
                        message: 'Ocurrió un error al instalar el usuario administrador'
                    });
                }
            }


            // TODO: Aquí se pone la siguiente instalación.


            // Respuesta final:
            res.json({
                usuarioAdmin: respuesta[1] || {},
                niveles: respuesta[0] || {}
            });

        } catch (err) {
            console.log(Tiza.bold.yellow.bgBlack('Error al revisar si hay niveles instalados:'));
            console.log(Tiza.bold.yellow.bgBlack(err));
            res.json({
                success: false,
                message: 'Error al revisar si hay niveles instalados'
            });
        }

    } else {
        res.json({
            success: false,
            message: 'Código incorrecto'
        });
    }
};

