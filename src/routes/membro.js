var express = require("express");
var router = express.Router()

var membroController = require("../controllers/membroController")

router.post("/cadastrar", function (req, res) {
    membroController.cadastrar(req, res);
})


module.exports = router;