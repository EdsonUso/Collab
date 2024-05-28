var projetoModel = require('../models/projetoModel')


function cadastrar(req, res){
    var nome = req.body.nomeProjectServer;
    var descricao = req.body.descProjectServer;
    var idCollab = req.body.idCollabServer

    projetoModel.cadastrar(idCollab, nome, descricao);
}

module.exports = {
    cadastrar
}