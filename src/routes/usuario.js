var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/definirTipo", function(req,res){
    usuarioController.definirTipo(req, res);
})

router.post("/listar", function(req, res){
    usuarioController.listar(req, res)
})

router.get("/listarTipo", function(req, res){
    usuarioController.listarPorTipo(req, res)
})

module.exports = router;