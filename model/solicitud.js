'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolicitudSchema = Schema({
    radicado: Number,
    tipo: String,
    requerimiento: String,
    respuesta: String,
    origen: Number,
    fecha_sistema: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Solicitud', SolicitudSchema, 'pqr');