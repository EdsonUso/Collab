var pubModel = require("../models/pubModel.js")

function cadastrar(req, res) {
    var idCollab = req.body.idCollabServer;
    var idProjeto = req.body.idProjetoServer;
    var desc = req.body.descServer;
    var file = req.file.fileServer;

    pubModel.cadastrar(idCollab, idProjeto, desc, file)
        .then(resultado => {
            res.status(201).send("Usuario criado com sucesso", resultado);
        }).catch(err => {
            res.status(500).send(err);
        });
}



module.exports = {
    cadastrar
}