'use strict';

const model_utiles = require('./lista_utiles.model');
const model_cedu = require('../centro_educativo/centroEducativo.model');

module.exports.registrar = (req, res) =>{
    let lista_utiles_nuevo = new model_utiles(
        {
            codigo : req.body.codigo,
            tipo : req.body.tipo,
            nombre : req.body.nombre,
            anno : req.body.anno
            
        }
    );

lista_utiles_nuevo.save(
    function(error){
        if (error) {
            res.json(
                {
                    success : false,
                    msg : `No se pudo guardar la lista de utiles, ocurrio el siguiente error ${error}`
                }
            )
        } else {
            res.json(
                {
                    success : true,
                    msg : `se registro la lista de utiles de forma correcta`
                }
            )
        }
    }
);
};


module.exports.obtener_todos = (req, res) =>{
    
    model_utiles.find({codigo : req.body.codigo}).then(
        function (utiles){
            const cantidad = Object.keys(utiles).length;
            
            if (cantidad > 0) {
                model_cedu.findOne({ _id: utiles[0].codigo}).then(
                    (centro) =>{
                        
                        res.json(
                            {
                                success : true,
                                coleccion_utiles : utiles,
                                nombreCentro: centro.nombre
                            }
                        )
                    }

                )
                
                
            } else {
                res.json(
                    {
                        success : false,
                        coleccion_utiles : `no se encontraron lista de útiles registrados`
                    }
                )
            }
        }
        
    )
};


module.exports.agregar_articulos = (req, res) =>{

    model_utiles.update(
        { _id : req.body.id_lista},

        {
            $push:
            {
                'articulos':
                {
                  codigo: req.body.codigo_articulo,
                  cantidad : req.body.cantidad  
                }
            }

        },
        function(error){
            if (error) {
                res.json(
                    {
                        success : false,
                        msg : `No se pudo guardar el articulo, ocurrio el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se registro el articulo con exito `
                    }
                )
            }
        }

    );
};


module.exports.buscar_por_id = (req, res) => {
    model_utiles.find({_id : req.body.id }).then(
        function (lista){
            if (lista) {
                res.json(
                    {
                        success : true,
                        lista : lista
                    }
                )
            } else {
                res.json(
                    {
                        success : false,
                        coleccion_utiles : `no se encontraron lista de útiles registrados`
                    }
                )
            }
        }
        
    )
};