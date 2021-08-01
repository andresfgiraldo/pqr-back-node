'use strict'

var express = require('express');
var CtrSolicitud = require('../controller/solicitud');

var router = express.Router();

router.post('/crear', CtrSolicitud.save);
router.get('/listar', CtrSolicitud.list);
router.get('/buscar/:id?', CtrSolicitud.get);
router.put('/actualizar/:id?', CtrSolicitud.udpate);
router.delete('/borrar/:id?', CtrSolicitud.delete);

module.exports = router;