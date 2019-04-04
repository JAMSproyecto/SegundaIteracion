'use strict';

const Tiza = require('chalk');
const ModelRegistrarCEdu = require('./centroEducativo.model');
const ModelUsuario = require('./../usuarios/usuario.model');
const ObtenerPin = require('./../funciones_genericas/obtenerPin');
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');

const nodemailer = require('nodemailer');

let transporteCorreo = nodemailer.createTransport({
    service: 'gmail',
    //port: '25',
    secure: true,
    auth: {
        user: 'soporte.mep.costarica@gmail.com',
        pass: '1Proyecto9'
    }
});

let enviarCorreo = (pCorreoPara, pNombre, pPin) => {

    const opcionesCorreo = {
        from: 'soporte.mep.costarica@gmail.com',
        to: pCorreoPara,
        subject: 'Verificación de correo electrónico',

        html: '<table border=0 cellSpacing=0 cellPadding=0 width="100%" bgColor="#f9f9f9"><tr><td style="font-size: 17px;background-color: #104E8B;color: #FFFFFF;font-weight: 700; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;">Estimado(a) ' + pNombre + '</td></tr> <tr><td style="font-size: 16px;background-color: #FFFFFF;color: #333333;font-weight: 500; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;border-top-width: 1px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-color: #CCCCCC;border-right-color: #CCCCCC;border-bottom-color: #CCCCCC;border-left-color: #CCCCCC;">Gracias por registrarse en nuestro sistema, para completar el perfil de usuario necesita el siguiente PIN de validaci&oacute;n:</td></tr><tr><td style="font-size: 22px;background-color: #FFFFFF;color: #565656;font-weight: 800; line-height:30px;font-family: Arial;padding-top: 4px;padding-right: 10px;padding-bottom: 4px;padding-left: 10px;margin-top: 3px;margin-right: 3px;margin-bottom: 3px;margin-left: 3px;border-top-width: 1px;border-right-width: 1px;border-bottom-width: 1px;border-left-width: 1px;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-left-style: solid;border-top-color: #CCCCCC;border-right-color: #CCCCCC;border-bottom-color: #CCCCCC;border-left-color: #CCCCCC;text-align:center;">' + pPin + '</td></tr></table>'
    };

    transporteCorreo.sendMail(opcionesCorreo, (error, info) => {
        if (error) {
            console.log(Tiza.bold.yellow.bgBlack('Error al enviar el correo:'));
            console.log(Tiza.bold.yellow.bgBlack(error));
        } else {
            console.log('Envío de correo: ' + info.response);
        }
    });
};


module.exports.registrar_centro_educativo = async (req, res) => {
    try {

        const existeUsuario = await ModelUsuario.find({correo: req.body.correoCentro}).countDocuments();

        if (existeUsuario < 1) {

            const elPin = ObtenerPin.get();

            let registroUsuario = new ModelUsuario();
            registroUsuario.correo = req.body.correoCentro;
            registroUsuario.pin = elPin;
            registroUsuario.tipo = 'CentroEducativo';
            registroUsuario.fechaCreado = ObtenerFecha.get();

            let guardarUsuario = await registroUsuario.save();


            let cEduNuevo = new ModelRegistrarCEdu();

            cEduNuevo.correo = req.body.correoCentro;
            cEduNuevo.nombre = req.body.nombre;
            cEduNuevo.nombreComercial = req.body.nombreComercial;
            cEduNuevo.cedulaJuridica = req.body.cedulaJuridica;
            cEduNuevo.tipoInstitucion = req.body.tipoInstitucion;
            cEduNuevo.annoFundacion = req.body.annoFundacion;
            cEduNuevo.referenciaHistorica = req.body.resenna;
            cEduNuevo.telefono = req.body.telefonoCentro;
            cEduNuevo.fax = (req.body.fax || '');
            cEduNuevo.sitioWeb = (req.body.sitioWeb || '');
            cEduNuevo.redesSociales = (req.body.redesSociales || '');
            cEduNuevo.tipoInstitucion = req.body.tipoInstitucion;
            cEduNuevo.nivel = req.body.niveles;
            cEduNuevo.direccion = [{
                idProvincia: req.body.idProvincia,
                idCanton: req.body.idCanton,
                idDistrito: req.body.idDistrito,
                sennas: req.body.dirSennas
            }];
            cEduNuevo.contacto = [{
                correo: req.body.correoContacto,
                primerNombre: req.body.primerNombre,
                segundoNombre: req.body.segundoNombre,
                primerApellido: req.body.primerApellido,
                segundoApellido: req.body.segundoApellido,
                identificacion: req.body.identificacionContacto,
                departamento: req.body.departamentoContacto,
                telefono: req.body.telefonoContacto
            }];
            cEduNuevo.calificacion = [{
                mep: 0,
                padres: 0
            }];
            cEduNuevo.adjuntos = [];
            cEduNuevo.servicios = [];
            cEduNuevo.actividades = [];
            cEduNuevo.comentarios = [];
            cEduNuevo.idiomas = [];
            cEduNuevo.religion = '';
            cEduNuevo.tipoAlumno = 'Mixto';
            cEduNuevo.bachillerInternacional = false;

            cEduNuevo.ubicacion = [{
                latitud: '0',
                longitud: '0'
            }];

            cEduNuevo.fotoCentro = req.body.fotoCentro;

            let guardarCedu = await cEduNuevo.save();

            let enviar = enviarCorreo(req.body.correoContacto, req.body.primerNombre + ' ' + req.body.primerApellido, elPin);

            res.json({
                success: true,
                message: 'El centro educativo se registró correctamente'
            });
        } else {
            const mensaje = 'El usuario ' + req.body.primerNombre + ' ' + req.body.primerApellido + ' ya existe';

            console.log(Tiza.bold.yellow.bgBlack(mensaje));

            res.json({
                success: false,
                message: mensaje
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error al registrar el centro educativo:'));
        console.log(Tiza.bold.yellow.bgBlack(err.message));

        res.json({
            success: false,
            message: 'Error al registrar el centro educativo'
        });
    }


};


module.exports.obtener_todos_centro_educativo = async (req, res) => {
    try {
        const mostrarColumnas = {}; //{ _id: 0 };

        const resultado = await ModelRegistrarCEdu.find({}, mostrarColumnas).select('fotoCentro nombreComercial calificacion direccion').sort({_id: 'desc'});
        if (!!Object.keys(resultado).length) {
            res.json({
                success: true,
                message: resultado
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontraron datos'
            });
        }
    } catch (err) {
        console.log(Tiza.bold.yellow.bgBlack('Error:'));
        console.log(Tiza.bold.yellow.bgBlack(err));
        res.json({
            success: false,
            message: 'Error al obtener los centros educativos'
        });
    }
};


/**
 * titulo_centro_educativo
 * tabla__servicios
 */
module.exports.obtener_perfil_centro_educativo = (req, res) => {
    ModelRegistrarCEdu.findById(req.body.id).then(
        (centro) => {
            res.json({
                success: true,
                centro: centro
            });
        });
};




