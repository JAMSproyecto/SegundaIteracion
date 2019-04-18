'use strict';

const Mongoose = require('mongoose');
const TiposEsquema = Mongoose.Schema.Types;
const AutoIncrementar = require('mongoose-plugin-autoinc');
const NombreTabla = 'centro_educativo_';

let schemaRegistrarCEdu = new Mongoose.Schema(
    {
        correo: {
            type: TiposEsquema.String,
            required: true,
            unique: true,
            trim: true
        },
        nombre: {
            type: TiposEsquema.String,
            required: true,
            trim: true
        },
        nombreComercial: {
            type: TiposEsquema.String,
            required: true,
            trim: true
        },
        cedulaJuridica: {
            type: TiposEsquema.Number,
            required: true
        },
        tipoInstitucion: {
            type: TiposEsquema.String,
            required: true,
            trim: true,
            enum: ['Privada', 'Pública']
        },
		
		fotoCentro: {type: TiposEsquema.String, required: false, default: ''},
		 
        direccion: [{
             idProvincia: {type: TiposEsquema.Number, required: true},
             idCanton: {type: TiposEsquema.Number, required: true},
             idDistrito: {type: TiposEsquema.Number, required: true},
             sennas: {type: TiposEsquema.String, required: true}
        }],
		
        ubicacion: [{
            latitud: {type: TiposEsquema.String, trim: true, required: true},
            longitud: {type: TiposEsquema.String, trim: true, required: true}
        }],
        annoFundacion: {
            type: TiposEsquema.Number,
            required: true
        },
        referenciaHistorica: {
            type: TiposEsquema.String,
			required: true
        },
        adjuntos: [{
            type: TiposEsquema.String, required: true
        }],
        telefono: {
            type: TiposEsquema.Number,
            min: 8,
            required: true
        },
        fax: {
            type: TiposEsquema.Number, required: false, default: ''
        },
        sitioWeb: {
            type: TiposEsquema.String, required: false, default: ''
        },
		
        redesSociales: {
            type: TiposEsquema.String, required: false, default: ''
        },
        contacto: [{
            correo: {type: TiposEsquema.String, trim: true},
            primerNombre: {type: TiposEsquema.String},
            segundoNombre: {type: TiposEsquema.String},
            primerApellido: {type: TiposEsquema.String},
            segundoApellido: {type: TiposEsquema.String},
            identificacion: {type: TiposEsquema.Number},
            departamento: {type: TiposEsquema.String},
            telefono: {type: TiposEsquema.Number}/*,
			 foto: ,
            extension: {type: TiposEsquema.Number}*/
        }],
	/*---------------------------------------- */
        tipoAlumno: {
            type: TiposEsquema.String,
            required: false,
            trim: true,
			default: 'Mixto',
            enum: ['Mixto', 'Mujer', 'Hombre']
        },
        bachillerInternacional: {
            type: TiposEsquema.Boolean, required: false, default: false
        },
        religion: {
            type: TiposEsquema.String, required: false, default: ''
        },
        idiomas: [{
            type: TiposEsquema.String, required: false, default: ''
        }],
        servicios: [{
            type: TiposEsquema.String, required: false
        }],
        actividades: [{
            descripcion: {type: TiposEsquema.String},
            fecha: {type: TiposEsquema.String}
        }],
        comentarios: [{
            texto: {type: TiposEsquema.String}/*,
             posteadoPor: {
                 type: TiposEsquema.ObjectId,
                 ref: 'padres_familia_'
             }*/
        }],
		
		//En el caso de la calificación de los padres que se almacena aquí es el promedio de toda la lista de calificaciones realizadas por los padres.
		calificacion: [{
		mep: {type: TiposEsquema.Number, min:0, max: 10, default:0},
		padres: {type: TiposEsquema.Number, min:0, max: 5, default:0}
	    }],
		
		
		/* TODO : Los niveles es mejor trabajarlos en una tabla por aparte en la tabla de niveles, donde cada nivel tenga
		su propia lista de utiles y relacionar los articulos.
		* aquí sólo sería poner un array con la lista de los ids de los nivel del centro.
		*/
		nivel: {type: TiposEsquema.String, required: true},
        /*nivel: [{
            idNivel: {type: TiposEsquema.ObjectId, ref: 'centro_educativo_nivel_', required: true},
            listaUtiles: [{
                tipo: {type: TiposEsquema.String},
                descripcion: {type: TiposEsquema.String},
                cantidad: {type: TiposEsquema.Number}
				
				//articulos...
				
            }]
        }],*/
       
        //enfasis,
    }
);

schemaRegistrarCEdu.plugin(AutoIncrementar.plugin, {
    model: NombreTabla,
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = Mongoose.model(NombreTabla, schemaRegistrarCEdu);

