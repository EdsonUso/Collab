var projetoModel = require('../models/projetoModel')


function cadastrar(req, res){
    var nome = req.body.nomeProjectServer;
    var descricao = req.body.descProjectServer;
    var idCollab = req.body.idCollabServer

    projetoModel.cadastrar(idCollab, nome, descricao);
}


function listar(req, res){
    var idCollab = req.body.idCollabServer;

    projetoModel.listar(idCollab)
}

module.exports = {
    cadastrar,
    listar
}