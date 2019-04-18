'use strict';

const model_registrar_noticia = require('./registrar_noticia.model');
const fecha = require('./../funciones_genericas/obtenerFecha');


module.exports.registrar_noticia = (req, res) => {
    let noticia_nueva = new model_registrar_noticia(
        {
            idCentro: req.body.idCentro,
            tema: req.body.tema,
            informacion: req.body.informacion,
            fecha: fecha.get(),
            estado: 'Activo'

        }
    );

    noticia_nueva.save(
        function (error) {
            if (error) {
                res.json(
                    {
                        success: false,
                        msg: `La noticia no pudo ser registrada, ocurrió el siguiente error ${error}`
                    }
                )
            } else {

                res.json(
                    {
                        success: true,
                        msg: `Se registró la noticia de manera exitosa`
                    }
                )
            }
        }

    );
};



module.exports.listar_todas_noticias = function (req, res) {
    const filtros = { idCentro: req.body.idCentro };
    model_registrar_noticia.find(filtros).sort({fecha: 'desc'}).then(
        function (resultado) {
			if (resultado) {
            if (Object.keys(resultado).length > 0) {
                
                    let listarResultado = [];
                    const has = Object.prototype.hasOwnProperty;
                    let key;
                    for (key in resultado) {
                        if (!has.call(resultado, key)) continue;

                        listarResultado.push(
                            {
                                '_id': resultado[key]['_id'] || '',
                                'idCentro': resultado[key]['idCentro'] || 0,
                                'tema': resultado[key]['tema'] || '',
                                'informacion': resultado[key]['informacion'] || '',
                                'fecha': formatearFecha(resultado[key]['fecha'] || ''),
                                'estado': resultado[key]['estado'] || ''
                            }
                        );
                    }
                    res.json(
                        {
                            success: true,
                            msg: listarResultado
                        }
                    )
            } else {
                res.json(
                    {
                        success: false,
                        msg: 'No se encontraron noticias'
                    }
                )
            }
        }else {
                res.json(
                    {
                        success: false,
                        msg: 'No se encontraron noticias'
                    }
                )
            }
        }

    )
};


module.exports.buscar_por_id = function (req, res) {
    model_registrar_noticia.find({ _id: req.body.idCentro }).then(
        function (noticia) {
            if (noticia) {
                res.json(
                    {
                        success: true,
                        msg: noticia
                    }
                )
            } else {
                res.json(
                    {
                        success: false,
                        msg: 'No se encontró la noticia'
                    }
                )
            }
        }

    )

}


module.exports.actualizar_noticia = function (req, res) {
    console.log(req.body);
    model_registrar_noticia.findByIdAndUpdate(req.body.id, { $set: req.body }, function (error) {
        if (error) {
            res.json(
                {
                    success: false,
                    msg: `No se puede actualizar la noticia, ocurrió el siguiente error ${error}`
                }
            );

        } else {
            res.json(
                {
                    success: true,
                    msg: 'La noticia se actualizó exitosamente'
                }
            );

        }
    });
}


module.exports.eliminar= function (req, res) {
    console.log(req.body);
    model_registrar_noticia.findByIdAndRemove(req.body.id,  
        function (error) {
        if (error) {
            res.json(
                {
                    success: false,
                    msg: `No se pudo eliminar la noticia, ocurrió el siguiente error ${error}`
                }
            );

        } else {
            res.json(
                {
                    success: true,
                    msg: 'La noticia se elimino  exitosamente'
                }
            );

        }
    });
}

