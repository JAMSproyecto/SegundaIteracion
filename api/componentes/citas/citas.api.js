'uset strict';
const cita_modelo = require('./citas.model');
const nodemailer = require('nodemailer');
const cedu_model = require('../centro_educativo/centroEducativo.model');


/*funcion para mandar correo al padre*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soporte.mep.costarica@gmail.com',
        pass: '1Proyecto9'
    }
});
/* fin de funcion para mandar al padre*/

/*funcion para registrar nueva cita*/
module.exports.registrar = (req, res) => {


    
    let nueva_cita = new cita_modelo(
        {
            idCentro : req.body.idCentro,
            Nombre: req.body.Nombre,
            Apellidos: req.body.Apellidos,
            Telefono: req.body.Telefono,
            Correo: req.body.Correo,
            Fecha: req.body.Fecha,
            Hora: req.body.Hora,
            Motivo: req.body.Motivo,
            Comentario: req.body.Comentario,
            Centro_asociado: req.body.Centro_asociado

        }
    );



    nueva_cita.save(
        function (error) {
            if (error) {
                res.json(
                    {
                        success: false,
                        msg: `No se logro guardar los datos ${error}`

                    }
                );

            } else {
                /*envio el correo de confirmacion al padre*/
                let mailOptions = {
                    from: 'soporte.mep.costarica@gmail.com',
                    to: nueva_cita.Correo,
                    subject: 'Registro de Cita recibido',
                    html: `<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Email Subject</title><meta name="referrer" content="never"><meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document"><meta type="xrm/designer/setting" name="font-family" value="Verdana, Arial, sans-serif" datatype="font" label="Font Family"><meta type="xrm/designer/setting" name="body-text-size" value="14px" datatype="text" label="Body Font Size"><meta type="xrm/designer/setting" name="body-text-color" value="#000000" datatype="color" label="Body Text Color"><style>body {font-family: /* @font-family */Verdana, /* @font-family */Arial, /* @font-family */sans-serif/* @font-family */;font-size: /* @body-text-size */14px/* @body-text-size */;color: /* @body-text-color */ #000000 /* @body-text-color */;}</style></head><body><div class="wrapperContainer" data-container="true"> <div data-editorblocktype="Image"><div class="imageWrapper"><img src="https://mktdplp102wuda.azureedge.net/735c6d3d-2d52-e911-a825-000d3a1ee335/qWYyek6L9kY_PSgR0YZ0uvGr8WRC0boKJIC5k7Emecs!"></div>
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
                    
                    </div><div data-editorblocktype="Text"><p><strong><span style="font-size:18px;">Estimado ${nueva_cita.Nombre},</span></strong></p>
                    
                    <p></p>
                    
                    
                    
                    
                    
                    
                    </div><div data-editorblocktype="Text"><p>Has programado una cita para el día ${nueva_cita.Fecha} a las ${nueva_cita.Hora}.</p>
                    
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
                    </div></div></body>`,

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
                        msg: `Registro exitoso`
                    }
                );
            }
        }
    );
}
/*fin de funcion de registro de nueva cita*/

/*funcion de listar citas*/
module.exports.listar_todos = (req, res) => {

    cita_modelo.find({codigo : req.body.codigo}).then(
        function (citas) {
            if (citas.length > 0) {
                
                res.json(
                    {
                        success: true,
                        citas: citas
                    }
                )
            } else {
                res.json(
                    {
                        success: false,
                        comentarios: 'No se encontraron citas'
                    }
                )
            }
        }

    )
};
/*fin de funcion listar citas*/


/**
 * obtener_citasCentro
 * @param req Parametro de petición de cliente
 * @param res Parametro de respuesta a cliente
 *  
 */
module.exports.obtener_citasCentro = (req, res) =>{
    cita_modelo.find({Centro_asociado : req.body.idCentro}).then(function (citas) {
        if (citas.length > 0) {
            res.json(
                {
                    success: true,
                    citas: citas
                }
            )
        } else {
            res.json(
                {
                    success: false,
                    citas: 'No se encontraron citas'
                }
            )
        }
    });
}