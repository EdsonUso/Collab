var express = require("express");
var router = express.Router();
var upload = require('../config/configUpload');

var projetoController = require("../controllers/projetoController")

router.post("/cadastrar", upload.single('foto'), function(req, res){
    projetoController.cadastrar(req, res)
})

router.post("/listar", function(req, res){
    projetoController.listar(req, res)
})

module.exports = router; 