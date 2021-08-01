'use strict'

// Cargar modulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');


// Ejecutar express para trabajar con HTTP
var app = express();

// Cargar las rutas - desde ficheros
var pqr_routes = require('./routes/solicitud');


// Middlewares - que se ejecuta antes de cargar una ruta
app.use(bodyParser.urlencoded({ extended: false })) // cargar el body parser en app
app.use(bodyParser.json()); //convertir todas las peticiones que lleguen a JSON


// CORS - activar para permitir peticiones desde frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Prefijos a rutas
app.use('/api/pqr', pqr_routes);



// Exportar modulo (fichero actual) para usar app.js en index
module.exports = app;