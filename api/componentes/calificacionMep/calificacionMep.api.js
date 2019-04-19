'use strict';

const modelCalificacionMEP = require('./calificacionMep.model');


module.exports.registrar_calificacionMEP = (req, res) => {

    let calificacionMEP_nueva = new modelCalificacionMEP(
        {
            idCentro: req.body.idCentro,
            calificacionTotal: req.body.calificacionTotal,
            rubro1: req.body.rubro1,
            calificacionRubro1: req.body.calificacionRubro1,
            rubro2: req.body.rubro2,
            calificacionRubro2: req.body.calificacionRubro2,
            rubro3: req.body.rubro3,
            calificacionRubro3: req.body.calificacionRubro3,
            rubro4: req.body.rubro4,
            calificacionRubro4: req.body.calificacionRubro4,
            rubro5: req.body.rubro5,
            calificacionRubro5: req.body.calificacionRubro5,
            rubro6: req.body.rubro6,
            calificacionRubro6: req.body.calificacionRubro6,
            rubro7: req.body.rubro7,
            calificacionRubro7: req.body.calificacionRubro7,
            rubro8: req.body.rubro8,
            calificacionRubro8: req.body.calificacionRubro8,
            rubro9: req.body.rubro9,
            calificacionRubro9: req.body.calificacionRubro9,
            rubro10: req.body.rubro10,
            calificacionRubro10: req.body.calificacionRubro10,
            estado: 'Activo'
        }
    );

    calificacionMEP_nueva.save(
        function (error) {
            if (error) {
                res.json(
                    {
                        success: false,
                        msg: `La calificación no pudo ser registrada, ocurrió el siguiente error ${error}`
                    }
                )
            } else {

                res.json(
                    {
                        success: true,
                        msg: `Se registró la calificación de manera exitosa`
                    }
                )
            }
        }

    );
};