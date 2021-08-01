'use strict'

var validator = require('validator');
var Solicitud = require('../model/solicitud');

var controller = {

    save: (req, res) => {
        //recoger parametros del post
        var params = req.body;

        //validar datos (validator)
        try {

            var validate_tipo = !validator.isEmpty(params.tipo);

            if (validate_tipo) {

                //crear el objeto a guardar
                var solicitud = new Solicitud();

                //asignar valores
                solicitud.radicado = Date.now();
                solicitud.tipo = params.tipo;
                solicitud.requerimiento = params.requerimiento;
                solicitud.respuesta = "";
                solicitud.origen = (!params.origen === undefined) ? params.origen : null;


                //gardar el articulo
                solicitud.save((err, solicitudStored) => {
                    if (err || !solicitudStored) {
                        return res.status(404).send({
                            status: "error",
                            message: "Solicitud no se pudo guardar"
                        });
                    }

                    //devolver una respuesta
                    return res.status(200).send({
                        status: "success",
                        message: "Solicitud guardada correctamente",
                        solicitud,
                    });
                });
            }



        } catch (error) {
            return res.status(200).send({
                status: "error",
                message: "Faltan datos.",
                error
            });
        }
    },
    list: (req, res) => {
        //find
        Solicitud.find({}).sort('-radicado').exec((err, solicitudes) => {

            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: err
                });
            }

            return res.status(200).send({
                status: "success",
                message: "Listado de Solicitudes",
                solicitudes
            });
        })

    },
    get: (req, res) => {

        var solicitudId = req.params.id;

        if (!solicitudId || solicitudId == null) {
            return res.status(404).send({
                status: "error",
                message: "No ha enviado el codigo de solicitud"
            });
        }

        //find by radicado
        Solicitud.find({
            radicado: solicitudId
        }, (err, solicitud) => {

            if (err || !solicitud) {
                return res.status(500).send({
                    status: "error",
                    message: "No existe solicitud",
                    error: err
                });
            }

            return res.status(200).send({
                status: "success",
                message: "Solicitud encontrada correctamente",
                solicitud
            });
        })

    },
    udpate: (req, res) => {

        var solicitudId = req.params.id; //parametros de la ruta
        var params = req.body; //parametros en body

        if (!solicitudId || solicitudId == null) {
            return res.status(404).send({
                status: "error",
                message: "No ha enviado el codigo de la solicitud"
            });
        }

        try {
            var validate_tipo = !validator.isEmpty(params.tipo);

            if (validate_tipo) {
                Solicitud.findOneAndUpdate({
                    radicado: solicitudId
                }, params, {
                    new: true
                }, (err, solicitudUpdated) => {
                    if (err || !solicitudUpdated) {
                        return res.status(404).send({
                            status: "error",
                            message: "Solicitud no se pudo actualizar"
                        });
                    }

                    //devolver una respuesta
                    return res.status(200).send({
                        status: "success",
                        message: "Solicitud actualizado correctamente.",
                        solicitud: solicitudUpdated,
                    });
                })
            }

        } catch (error) {
            return res.status(200).send({
                status: "error",
                message: "Faltan datos.",
                error
            });
        }

    },
    delete: (req, res) => {

        var solicitudId = req.params.id; //parametros de la ruta

        if (!solicitudId || solicitudId == null) {
            return res.status(404).send({
                status: "error",
                message: "No ha enviado el codigo de la solicitud"
            });
        }

        Solicitud.findOneAndDelete({
            radicado: solicitudId
        }, (err, solicitudRemoved) => {
            if (err || !solicitudRemoved) {
                return res.status(404).send({
                    status: "error",
                    message: "Solicitud no se pudo eliminar"
                });
            }

            //devolver una respuesta
            return res.status(200).send({
                status: "success",
                message: "Solicitud borrado correctamente.",
                soliciud: solicitudRemoved,
            });
        });
    }
}

module.exports = controller;