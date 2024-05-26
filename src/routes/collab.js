var express = require("express")
var router = express.Router();

var collabController = require("../controllers/collabController");

router.post("/cadastrar", function (req, res){
    collabController.cadastrar(req, res)
})

router.post("/listar", function(req, res){
    collabController.listar(req, res)
})

module.exports = router;