'use strict';

const model_utiles = require('./lista_utiles.model');
const model_cedu = require('../centro_educativo/centroEducativo.model');

//para registrar lista de utiles 
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

//para obtener la lista de útiles por id del centro
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
                                nombre_centro: centro.nombre
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

//para agregar articulos a la lista de útiles
module.exports.agregar_articulos = (req, res) =>{

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

//para buscar una lista de útiles por id especifico
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

//funcion para modificar la lista lista de utiles
module.exports.modificar_lista_utiles = function(req, res){

    model_utiles.findOneAndUpdate(
        { _id : req.body.id_lista},
    
        {
            $set:
            {
                nombre : req.body.nombre,
                anno: req.body.anno
                
            }

        },
        function(error){
            if (error) {
                res.json(
                    {
                        success : false,
                        msg : `No se pudo modificar la lista de utiles, ocurrió el siguiente error ${error}`
                    }
                )
            } else {
                res.json(
                    {
                        success : true,
                        msg : `Se modificó la lista de utiles con éxito `
                    }
                )
            }
        }
    );
};

//para activar y desactivar la lista de útiles 
module.exports.activar_desactivar = function(req, res){
    let estado ='';

    if(req.body.estado == 'Activo'){
        estado = 'Inactivo';
    }else{
        estado = 'Activo';
    }
    model_utiles.findByIdAndUpdate(req.body.id, {$set: { 
        estado: estado 
      }},
        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo activar la lista de útiles '});
            }else{
                res.json({success: true ,msg: 'la lista de útiles se activó con éxito'}); 
            }
        }
    )
};

//para eliminar la lista de útiles 
module.exports.eliminar_lista = function(req, res){
    
    model_utiles.findByIdAndRemove(req.body.id,

        function(error){
            if(error){
                res.json({success: false ,msg: 'No se pudo eliminar la lista útiles'});
            }else{
                res.json({success: true ,msg: 'La lista útiles se eliminó con éxito'}); 
            }
        }
    )
};