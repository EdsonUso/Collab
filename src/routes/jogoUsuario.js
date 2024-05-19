var express = require("express");
var router = express.Router();

var jogoUsuarioController = require("../controllers/jogoUsuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    jogoUsuarioController.cadastrar(req, res);
})

module.exports = router