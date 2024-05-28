var express = require("express");
var router = express.Router();

var projetoController = require("../controllers/projetoController")

router.post("/cadastrar", function(req, res){
    projetoController.cadastrar(req, res)
})


module.exports = router; 