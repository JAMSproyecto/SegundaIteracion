'use strict';

const InputFotoCentroEdu = document.querySelector('#fotoCentroEdu');
const ImgFotoCentroEdu = document.querySelector('#fotoCentroEduPrevia');
const PesoFotoCentroEdu = document.querySelector('#pesoFotoCentroEdu');
const FotoCentroEduArrastrar = document.querySelector('#fotoCentroEduArrastrar');

const InputNombre = document.querySelector('#txtNombre');
const InputNombreComercial = document.querySelector('#txtNombreComercial');
const InputCedulaJuridica = document.querySelector('#txtCedulaJuridica');
const InputCorreoCentro = document.querySelector('#txtCorreoCentro');
const InputAnnoFundacion = document.querySelector('#txtAnnoFundacion');
const InputResenna = document.querySelector('#txtResenna');
const InputTelefonoCentro = document.querySelector('#txtTelefonoCentro');
const InputFax = document.querySelector('#txtFax');
const InputTipoInstitucion = document.querySelector('#sltTipoInstitucion');
const InputNiveles = document.querySelector('#sltNiveles');
const InputProvincia = document.querySelector('#sltProvincia');
const InputCanton = document.querySelector('#sltCanton');
const InputDistrito = document.querySelector('#sltDistrito');
const InputDirSennas = document.querySelector('#txtDirSennas');
const InputPrimerNombre = document.querySelector('#txtPrimerNombre');
const InputSegundoNombre = document.querySelector('#txtSegundoNombre');
const InputPrimerApellido = document.querySelector('#txtPrimerApellido');
const InputSegundoApellido = document.querySelector('#txtSegundoApellido');
const InputCorreoContacto = document.querySelector('#txtCorreoContacto');
const InputIdentificacionContacto = document.querySelector('#txtIdentificacionContacto');
const InputDepartamentoContacto = document.querySelector('#txtDepartamentoContacto');
const InputTelefonoContacto = document.querySelector('#txtTelefonoContacto');


const BotonRegistrar = document.querySelector('#btnRegistrar');


let mostrarAlerta = (mensaje, input) => {
	if (input) {
    input.classList.add('error_input');
	}
    Swal.fire({
        toast: false,
        title: mensaje,
        type: 'warning',
        position: 'center',
        //timer: 7000,
        animation: false,
        customClass: 'animated tada',
        showConfirmButton: true,
        onAfterClose: () => {
            if (input) {
                input.focus();
            }
        }
    });
};

/**
 * Retorna la fecha en el formato YYYYMMDDhhmmss
 * @return {Int}
 */
let obtenerFechaInt = () => {
    const fecha = new Date();
    const dia_semana = fecha.getDay();
    const anio = fecha.getFullYear();
    let dia_mes = fecha.getDate();
    let mes = fecha.getMonth();
    let h = fecha.getHours();
    let m = fecha.getMinutes();
    let s = fecha.getSeconds();
    mes += 1;
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia_mes < 10) {
        dia_mes = '0' + dia_mes;
    }
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    return parseInt(anio + mes + dia_mes + h + m + s, 10) || 0;
};


/**
 * @param  {Number}   bytes
 * @return {String}
 */
let tamannoArchivo = (bytes) => {
    let u = 0;
    while (bytes >= 1024 || -bytes >= 1024) {
        bytes /= 1024;
        ++u;
    }
    return (u ? bytes.toFixed(2) + ' ' : bytes) + ' KMGTPEZY'[u] + 'B';
};

/**
 * @param  {Input} instancia de un select
 * @return {Array}
 */
let obtenerValoresSelect = (inputSelect) => {
    let opts = [];
    let i = 0;
    const len = inputSelect.options.length;
    for (i; i < len; ++i) {
        const opt = inputSelect.options[i];
        if (opt.selected) {
            opts.push(opt.value);
        }
    }
    return opts;
};


let obtenerExtension = (fname)=> {
	return fname.slice((fname.lastIndexOf('.') - 1 >>> 0) + 2);
}


let enviarDatos = async () => {

    const Nombre = InputNombre.value.trim();
    const NombreComercial = InputNombreComercial.value.trim();
    const CedulaJuridica = parseInt(InputCedulaJuridica.value, 10) || 0;
    const CorreoCentro = InputCorreoCentro.value.trim();
    const AnnoFundacion = parseInt(InputAnnoFundacion.value, 10) || 0;
    const Resenna = InputResenna.value.trim();
    const TelefonoCentro = parseInt(InputTelefonoCentro.value, 10) || 0;
    const Fax = parseInt(InputFax.value, 10) || 0;
    const TipoInstitucion = InputTipoInstitucion.value.trim();

    const arrNiveles = obtenerValoresSelect(InputNiveles);
    let Niveles = '';
    if (arrNiveles.length > 0) {
        Niveles = JSON.stringify(obtenerValoresSelect(InputNiveles)) || '';
    }

    const IdProvincia = parseInt(InputProvincia.value, 10) || 0;
    const IdCanton = parseInt(InputCanton.value, 10) || 0;
    const IdDistrito = parseInt(InputDistrito.value, 10) || 0;
    const DirSennas = InputDirSennas.value.trim();
    const PrimerNombre = InputPrimerNombre.value.trim();
    const SegundoNombre = InputSegundoNombre.value || '';
    const PrimerApellido = InputPrimerApellido.value.trim();
    const SegundoApellido = InputSegundoApellido.value || '';
    const CorreoContacto = InputCorreoContacto.value.trim();
    const IdentificacionContacto = parseInt(InputIdentificacionContacto.value, 10) || 0;
    const DepartamentoContacto = InputDepartamentoContacto.value.trim();
    const TelefonoContacto = parseInt(InputTelefonoContacto.value, 10) || 0;


    if (Nombre.length < 3) {
        mostrarAlerta('Digite un nombre válido', InputNombre);
        return false;
    } else {
        InputNombre.classList.remove('error_input');
    }
    if (NombreComercial.length < 3) {
        mostrarAlerta('Digite un nombre comercial válido', InputNombreComercial);
        return false;
    } else {
        InputNombreComercial.classList.remove('error_input');
    }
    if (CedulaJuridica.toString(10).length < 9) {
        mostrarAlerta('Digite una cédula jurídica válida', InputCedulaJuridica);
        return false;
    } else {
        InputCedulaJuridica.classList.remove('error_input');
    }
    if (CorreoCentro.length < 1) {
        mostrarAlerta('Digite un correo electrónico válido', InputCorreoCentro);
        return false;
    } else {
        InputCorreoCentro.classList.remove('error_input');
    }
    if (validarCorreo(CorreoCentro) == false) {
        mostrarAlerta('El correo electrónico ingresado no es válido', InputCorreoCentro);
        return false;
    } else {
        InputCorreoCentro.classList.remove('error_input');
    }
    if (AnnoFundacion < 1800) {
        mostrarAlerta('Digite un año de fundación válido', InputAnnoFundacion);
        return false;
    } else {
        InputAnnoFundacion.classList.remove('error_input');
    }
    if (Resenna.length < 10) {
        mostrarAlerta('Digite una reseña válida', InputResenna);
        return false;
    } else {
        InputResenna.classList.remove('error_input');
    }
    if (TelefonoCentro.toString(10).length < 8) {
        mostrarAlerta('Digite un número de teléfono válido', InputTelefonoCentro);
        return false;
    } else {
        InputTelefonoCentro.classList.remove('error_input');
    }
    if (TipoInstitucion.length < 1) {
        mostrarAlerta('Seleccione el tipo de institución', InputTipoInstitucion);
        return false;
    } else {
        InputTipoInstitucion.classList.remove('error_input');
    }
    if (arrNiveles.length < 1) {
        mostrarAlerta('Seleccione al menos un tipo de educación', InputNiveles);
        return false;
    } else {
        InputNiveles.classList.remove('error_input');
    }
    if (IdProvincia < 1) {
        mostrarAlerta('Seleccione una provincia', InputProvincia);
        return false;
    } else {
        InputProvincia.classList.remove('error_input');
    }
    if (IdCanton < 1) {
        mostrarAlerta('Seleccione un cantón', InputCanton);
        return false;
    } else {
        InputCanton.classList.remove('error_input');
    }
    if (IdDistrito < 1) {
        mostrarAlerta('Seleccione un distrito', InputDistrito);
        return false;
    } else {
        InputDistrito.classList.remove('error_input');
    }
    if (DirSennas.length < 1) {
        mostrarAlerta('Digite una dirección con señas', InputDirSennas);
        return false;
    } else {
        InputDirSennas.classList.remove('error_input');
    }
    if (DirSennas.length < 10) {
        mostrarAlerta('Dirección con señas muy corta', InputDirSennas);
        return false;
    } else {
        InputDirSennas.classList.remove('error_input');
    }
    if (PrimerNombre.length < 3) {
        mostrarAlerta('Digite un nombre válido', InputPrimerNombre);
        return false;
    } else {
        InputPrimerNombre.classList.remove('error_input');
    }
    if (PrimerApellido.length < 3) {
        mostrarAlerta('Digite un apellido válido', InputPrimerApellido);
        return false;
    } else {
        InputPrimerApellido.classList.remove('error_input');
    }

    if (CorreoContacto.length < 1) {
        mostrarAlerta('Digite un correo electrónico válido', InputCorreoContacto);
        return false;
    } else {
        InputCorreoContacto.classList.remove('error_input');
    }
    if (validarCorreo(CorreoContacto) == false) {
        mostrarAlerta('El correo electrónico ingresado no es válido', InputCorreoContacto);
        return false;
    } else {
        InputCorreoContacto.classList.remove('error_input');
    }

    if (IdentificacionContacto.toString(10).length < 9) {
        mostrarAlerta('Digite una identificación válida', InputIdentificacionContacto);
        return false;
    } else {
        InputIdentificacionContacto.classList.remove('error_input');
    }

    if (DepartamentoContacto.length < 1) {
        mostrarAlerta('Digite un departamento válido', InputDepartamentoContacto);
        return false;
    } else {
        InputDepartamentoContacto.classList.remove('error_input');
    }

    if (TelefonoContacto.toString(10).length < 8) {
        mostrarAlerta('Digite un número de teléfono válido', InputTelefonoContacto);
        return false;
    } else {
        InputTelefonoContacto.classList.remove('error_input');
    }

    let fotoCentro = '';

    registrarCentroEducativo(Nombre, NombreComercial, CedulaJuridica, CorreoCentro, AnnoFundacion, Resenna, TelefonoCentro, Fax, TipoInstitucion, Niveles, IdProvincia, IdCanton, IdDistrito, DirSennas, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, CorreoContacto, IdentificacionContacto, DepartamentoContacto, TelefonoContacto, fotoCentro);
};

BotonRegistrar.addEventListener('click', enviarDatos, false);


let cargarFoto = () => {
    if (InputFotoCentroEdu.files && InputFotoCentroEdu.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            //console.log('b64: ', reader.result);
            //console.log('img: ', e.target.result);
            ImgFotoCentroEdu.setAttribute('src', e.target.result);
            PesoFotoCentroEdu.innerHTML = tamannoArchivo(InputFotoCentroEdu.files[0].size) + ' de 2 MB permitidos';
        };
        reader.onerror = (e) => {
            console.error('Error: ', e);
        };
        reader.readAsDataURL(InputFotoCentroEdu.files[0]);
    }
};


InputFotoCentroEdu.addEventListener('change', cargarFoto, false);


FotoCentroEduArrastrar.addEventListener('dragover', (e) => {
    e.preventDefault();
    FotoCentroEduArrastrar.classList.add('dragging');
});

FotoCentroEduArrastrar.addEventListener('dragleave', () => {
    FotoCentroEduArrastrar.classList.remove('dragging');
});

FotoCentroEduArrastrar.addEventListener('drop', (e) => {
    e.preventDefault();
    FotoCentroEduArrastrar.classList.remove('dragging');
    InputFotoCentroEdu.files = e.dataTransfer.files;
    cargarFoto();
});

window.onload = () => {
	llenarProvincias();
    if (InputNombre) {
        InputNombre.select();
        InputNombre.focus();
    }
};



