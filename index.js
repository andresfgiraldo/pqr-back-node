'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/pqr', {
    useNewUrlParser: true, //nueva sintaxis que incluye mongodb con mongoose
    useUnifiedTopology: true, // (node:9138) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
    useFindAndModify: false //Metodos antiguos desactivados
}).then(() => {
    console.log("la conexion a la base de datos se realizó con éxito.!")

    //crear servidor y escuchar peticiones http
    app.listen(port, () => {
        console.log(`servidor corriendo en http://localhost:${port}`)
    })
});