'use strict';

/**
 * Valida si tiene:
 * Al menos una mayúscula
 * Al menos una minúscula
 * Al menos un número,
 * Al menos un símbolo
 * No espacios en blanco
 * @param  {String} pValor
 * @return {Boolean}
 */
let validarContrasena = (pValor) => {
    const ExpresionRegular = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?!.*[\s])[A-Za-z0-9]|[^a-zA-Z0-9]{,}$/;
    return ExpresionRegular.test(pValor);
};

/**
 * @param  {String} pValor
 * @return {Boolean}
 */
let validarCorreo = (pValor) => {
    const ExpresionRegular = /^((([a-z]|\d|[!#\$%&’\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&’\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
    return ExpresionRegular.test(pValor);
};

/**
 * @param  {String} pValor
 * @return {String}
 */
let codificar = (pValor) => {
    const Caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let salida = '';
    let i = 0;
    const Len = pValor.length;
    let c1, c2, c3;

    while (i < Len) {
        c1 = pValor.charCodeAt(i++) & 0xff;
        if (i == Len) {
            salida += Caracteres.charAt(c1 >> 2);
            salida += Caracteres.charAt((c1 & 0x3) << 4);
            salida += '==';
            break;
        }
        c2 = pValor.charCodeAt(i++);
        if (i == Len) {
            salida += Caracteres.charAt(c1 >> 2);
            salida += Caracteres.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            salida += Caracteres.charAt((c2 & 0xF) << 2);
            salida += '=';
            break;
        }
        c3 = pValor.charCodeAt(i++);
        salida += Caracteres.charAt(c1 >> 2);
        salida += Caracteres.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        salida += Caracteres.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        salida += Caracteres.charAt(c3 & 0x3F);
    }
    return salida;
};

