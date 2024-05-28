var express = require("express");
var router = express.Router();

var projetoController = require("../controllers/projetoController")

router.post("/cadastrar", function(req, res){
    projetoController.cadastrar(req, res)
})

router.post("/listar", function(req, res){
    projetoController.listar(req, res)
})

module.exports = router; 