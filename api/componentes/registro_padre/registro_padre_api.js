'use strict';
const Model_Registro_Padre = require('./registro_padre_model');
const Model_usuario = require('./../usuarios/usuario.model');
const Nodemailer = require('nodemailer');
const Obtener_Pin = require('./../funciones_genericas/obtenerPin');
const Pin_Obtenido = Obtener_Pin.get();
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');


let transporter = Nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'soporte.mep.costarica@gmail.com',
        pass: '1Proyecto9'
    }
});

module.exports.registrar_Padre = (req, res) => {

    let registro_usuario = new Model_usuario(
        {
            correo: req.body.email,
            pin: Pin_Obtenido,
            tipo: 'PadreFamilia',
            fechaCreado: ObtenerFecha.get()
        }

    );

    let registro_Padre = new Model_Registro_Padre(
        {
            correo: req.body.email,
            nombre: req.body.nombre,
            segundoNombre: req.body.segundoNombre,
            apellido: req.body.apellido,
            segundoApellido: req.body.segundoApellido,
            tipoIdentificacion: req.body.tipoIdentificacion,
            numIdentificacion: req.body.numIdentificacion,
            nacionalidad: req.body.nacionalidad,
            fechaNacimiento: req.body.fechaNacimiento,
            numCel: req.body.numCel,
            numCasa: req.body.numCasa,
            provincia: req.body.provincia,
            canton: req.body.canton,
            distrito: req.body.distrito,
            direccion: req.body.direccion,
            cantidadHijos: req.body.cantidadHijos,
            nombreHijo: req.body.nombreHijo,
            edadHijo: req.body.edadHijo,
            nombreHijo2: req.body.nombreHijo2,
            edadHijo2: req.body.edadHijo2,
            nombreHijo3: req.body.nombreHijo3,
            edadHijo3: req.body.edadHijo3,
            nombreHijo4: req.body.nombreHijo4,
            edadHijo4: req.body.edadHijo4
        }
    );

    registro_usuario.save(
        (error) => {
            if (error) {
                res.json(
                    {
                        success: false,
                        message: `Usuario ya existente, por favor intente otro correo`
                    }
                )
            } else {
                registro_Padre.save(
                    (error) => {
                        if (error) {
                            res.json(
                                {
                                    success: false,
                                    message: `Ha ocurrido el siguiente error ${error}`
                                }
                            )
                        } else {

                            let mailOptions = {
                                from: 'soporte.mep.costarica@gmail.com',
                                to: registro_Padre.correo,
                                subject: 'Verificación de correo electrónico',
                                html: `<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="referrer" content="never"><meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document"><meta type="xrm/designer/setting" name="font-family" value="Verdana, Arial, sans-serif" datatype="font" label="Font Family"><meta type="xrm/designer/setting" name="body-text-size" value="14px" datatype="text" label="Body Font Size"><meta type="xrm/designer/setting" name="body-text-color" value="#000000" datatype="color" label="Body Text Color"><style>body {font-family: /* @font-family */Verdana, /* @font-family */Arial, /* @font-family */sans-serif/* @font-family */;font-size: /* @body-text-size */14px/* @body-text-size */;color: /* @body-text-color */ #000000 /* @body-text-color */;}</style></head>
                                
                                <body><div class="wrapperContainer" data-container="true"> <div data-editorblocktype="Image"><div class="imageWrapper"><img src="./public/imgs/logo_MEP"></div>
                                </div><div data-editorblocktype="Divider"><div class="dividerWrapper" align="center">
                                <table aria-role="presentation" style="padding: 0px; margin: 0px; width: 100%">
                                    <tbody>
                                        <tr style="padding: 0px;">
                                            <td style="margin:0px; padding-left: 0px; padding-right: 0px; padding-top: 5px; padding-bottom: 5px; vertical-align:top;">
                                            <p style="margin: 0px; padding: 0px; border-bottom: 3px solid rgb(0, 128, 255); line-height: 0px; width: 100%;"><span>&nbsp;</span></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                
                                </div><div data-editorblocktype="Text"><p><strong><span style="font-size:18px;">Bienvenido al sistema ${registro_Padre.nombre},</span></strong></p>
                                
                                <p></p>
                                
                                
                                
                                
                                
                                
                                </div><div data-editorblocktype="Text"><p>Se ha registrado tu perfil de manera correcta en nuestra aplicación.</p>
                                
                                <p></p>
                                </div><div data-editorblocktype="Text"><p>Por favor ingrese el siguiente pin de validación en la sección de validación de credenciales, puede ingresar siguiendo este link.</p>
                                
                                <p></p>
                                </div><div data-editorblocktype="Text"><p>Su pin de validación es: ${Pin_Obtenido}</p>
                                
                                <p></p>
                                </div><div data-editorblocktype="Divider"><div class="dividerWrapper" align="center">
                                <table aria-role="presentation" style="padding: 0px; margin: 0px; width: 100%">
                                    <tbody>
                                        <tr style="padding: 0px;">
                                            <td style="margin:0px; padding-left: 0px; padding-right: 0px; padding-top: 5px; padding-bottom: 5px; vertical-align:top;">
                                            <p style="margin: 0px; padding: 0px; border-bottom: 3px solid rgb(0, 128, 255); line-height: 0px; width: 100%;"><span>&nbsp;</span></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                </div><div data-editorblocktype="Image"><div class="imageWrapper"><img src="">
                                
                                </div>
                                
                                
                                </div></div></body> </p>
                                `
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });

                            res.json(
                                {
                                    success: true,
                                    message: `Se registró el perfil de manera correcta`
                                }
                            )
                        }
                    }
                );
            }
        }
    );
};

module.exports.listar_Padres = (req, res) => {
    Model_Registro_Padre.find().then(
        function (data) {
            if (data.length > 0) {
                res.json(
                    {
                        success: true,
                        data: data
                    }
                )
            } else {
                res.json(
                    {
                        success: false,
                        data: 'Datos no encontrados'
                    }
                )
            }
        }
    );
};

module.exports.buscar_padre = function (req, res) {
    const filtros = { _id: req.body.idPadre };
console.log(filtros);
    Model_Registro_Padre.findOne(filtros).then(
        function (usuarioPadre) {
            if (usuarioPadre) {
                res.json(
                    {
                        success: true,
                        message: usuarioPadre
                    }
                );
            } else {
                res.json(
                    {
                        success: false,
                        message: 'No se encontró el padre de familia'
                    }
                );
            }

        }
    )
};
/*
module.exports.buscar_informacion_padre = function(req, res){
    Model_Registro_Padre.findOne({correo : req.body.correo}).then(
        function(usuarioInfoPadre){
            if(usuarioInfoPadre){
                res.json(
                {
                    success: true,
                    correo : usuarioInfoPadre
                }
                );
            }else{
                res.send('No se encontró el padre de familia');
            }

        }
    )
};
*/
