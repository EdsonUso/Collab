var express = require("express")
var router = express.Router()

var jogoInspiradorController = require("../controllers/jogoInspiradorController");

router.get("/listar", function(req, res){
    jogoInspiradorController.listar(req, res)
})

module.exports = router;