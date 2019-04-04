'use strict';

const model_registrar_noticia = require('./registrar_noticia.model');


module.exports.registrar_noticia = (req, res) =>{
    let noticia_nueva = new model_registrar_noticia(
        {
            idCentro : req.body.idCentro,
            tema : req.body.tema,
            noticia: req.body.noticia,
            autor : req.body.autor,
            fecha : req.body.fecha,
            informacion: req.body.informacion

        }
    );
    
    noticia_nueva.save(
        function(error){
            if(error){
                res.json(
                    {
                        success : false,
                        msg : `No se puede guardar la noticia, ocurrió el siguiente error ${error}`
                    }
                )
            }else{

                res.json(
                    {
                        success : true,
                        msg : `Se registró noticia de forma correcta`
                    }
                )
            }
        }

    );
};



module.exports.listar_todas_noticias = (req ,res) =>{
    const filtros = {idCentro: req.body.idCentro};
    model_registrar_noticia.find(filtros).then(
        function(noticias){
            if(noticias.length > 0){
                res.json(
                    {
                        success: true,
                        msg: noticias
                    }
                )
            }else{
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