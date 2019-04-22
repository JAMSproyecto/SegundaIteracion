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
                        msg: `¡El proceso no fue registrado con éxito, ocurrió el siguiente error ${error}`
                    }
                )
            } else {

                res.json(
                    {
                        success: true,
                        msg: `¡El proceso se registró de manera exitosa!`
                    }
                )
            }
        }

    );
};


module.exports.listar_calificacionMEP = (req, res) => {
    const filtros = { idCentro: req.body.idCentro };
    modelCalificacionMEP.findOne(filtros).then(
        function (data) {
            if(data){
                const cantidadResutados = Object.keys(data).length;
                if (cantidadResutados > 0) {
                        res.json(
                            {
                                success: true,
                                msg: data
                            }
                        )
                    } else {
                        res.json(
                            {
                                success: false,
                                msg: '¡No se encontraron los datos!'
                            }
                        )
                    }
            }else{
                res.json(
                    {
                        success: false,
                        msg: '¡No se encontraron los datos!'
                    }
                )
            }
          
        }
    );
};
