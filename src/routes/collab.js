var express = require("express")
var router = express.Router();
var upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var collabController = require("../controllers/collabController");

router.post("/cadastrar", upload.single('foto'), function (req, res){
    collabController.cadastrar(req, res)
})

router.post("/listar", function(req, res){
    collabController.listar(req, res)
})

router.get("/popular", function(req, res){
    collabController.listarPopular(req, res)
})

module.exports = router;