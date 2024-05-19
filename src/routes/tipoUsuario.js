var express = require("express");
var router = express.Router();

var tipoUsuarioController = require("../controllers/tipoUsuarioController");

router.get("/listar", function(req, res) {
    tipoUsuarioController.listar(req, res)
})

module.exports = router;