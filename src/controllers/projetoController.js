var projetoModel = require('../models/projetoModel')


function cadastrar(req, res){


    var foto = req.file.filename
    var nome = req.body.nomeProjectServer;
    var descricao = req.body.descProjectServer;
    var idCollab = req.body.idCollabServer

    console.log("id no controller", idCollab)

    var project = {foto, nome, descricao, idCollab}

    projetoModel.cadastrar(project);
}


function listar(req, res){
    var idUsuario = req.body.idUsuarioServer;
    console.log(idUsuario);

    projetoModel.listar(idUsuario)
    .then(resultado => {
        res.status(200).json(resultado); // Enviar JSON em vez de string
    }).catch(erro => {
        console.log(erro);
        console.log("\nHouve um erro ao realizar a listagem! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    cadastrar,
    listar
}