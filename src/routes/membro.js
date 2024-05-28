var express = require("express");
var router = express.Router()

var membroController = require("../controllers/membroController")

router.post("/cadastrar", function (req, res) {
    membroController.cadastrar(req, res);
})

router.post("/listar", function(req, res){
    membroController.listar(req, res)
})


module.exports = router;