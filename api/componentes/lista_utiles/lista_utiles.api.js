'use strict';

const model_utiles = require('./lista_utiles.model');
const model_cedu = require('../centro_educativo/centroEducativo.model');


module.exports.registrar = (req, res) =>{
    let lista_utiles_nuevo = new model_utiles(
        {
            codigo : req.body.codigo,
            tipo : req.body.tipo,
            nombre : req.body.nombre,
            anno : req.body.anno,
            estado : 'Activo'
        }
    );

lista_utiles_nuevo.save(
    function(error){
        if (error) {
            res.json(
                {
                    success : false,
                    msg : `No se pudo guardar la lista de útiles, ocurrió el siguiente error ${error}`
                }
            )
        } else {
            res.json(
                {
                    success : true,
                    msg : `Se registró la lista de útiles de forma correcta`
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
                console.log(utiles[0].codigo);
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
                        coleccion_utiles : `No se encontraron listas de útiles registradas`
                    }
                )
            }
        }
        
    )
};


module.exports.agregar_articulos = (req, res) =>{
console.log(req.body.id_lista);
    model_utiles.findByIdAndUpdate(
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
                        msg : `No se pudo guardar el artículo, ocurrió el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se registró el artículo con éxito `
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
                        coleccion_utiles : `No se encontraron listas de útiles registradas`
                    }
                )
            }
        }
        
    )
};

//obtener todas las lista de utiles 
module.exports.obtener_todos_general = (req, res) =>{
    
    model_utiles.find().then(
        function (utiles){
            const cantidad = Object.keys(utiles).length;
            
            if (cantidad > 0) {
                console.log(utiles[0].codigo);
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

//funcion para eliminar articulos de la lista 
module.exports.eliminar_articulo_lista = function(req, res){
    console.log('lista', req.body.id_lista)
    console.log('articulo',  req.body.id_articulo)
    model_utiles.updateOne(
        { _id : req.body.id_lista},

        {
            $pull:
            {
                'articulos':
                {
                    
                  codigo: req.body.id_articulo
                }
            }

        },
        function(error){
            if (error) {
                res.json(
                    {
                        success : false,
                        msg : `No se pudo rliminar el artículo, ocurrió el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se eliminó el artículo con éxito `
                    }
                )
            }
        }
    );
};

//funcion para modificar articulos de la lista 
module.exports.modificar_articulo_lista = function(req, res){
    console.log('lista', req.body.id_lista)
    console.log('articulo',  req.body.id_articulo)
    model_utiles.findOneAndUpdate(
        { _id : req.body.id_lista, "articulos.codigo" :req.body.id_articulo},

        {
            $set:
            {
                'articulos.$.cantidad': req.body.cantidad
                
            }

        },
        function(error){
            if (error) {
                res.json(
                    {
                        success : false,
                        msg : `No se pudo modificar el artículo, ocurrió el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se modificó el artículo con éxito `
                    }
                )
            }
        }
    );
};