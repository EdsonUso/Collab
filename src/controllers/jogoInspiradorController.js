var jogoInspiradorModel = require("../models/jogoInspiradorModel")


function listar(req, res) {
    jogoInspiradorModel.listar().then((resultado) => {
        res.status(200).json(resultado);
      });
}

module.exports = {
    listar
}