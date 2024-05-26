var collabModel = require("../models/collabModel")


function cadastrar(req, res){
    var nomeCollab = req.body.nomeCollabServer

    collabModel.cadastrar(nomeCollab)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro da collab! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function listar(req, res){
    collabModel.listar().then(
        function (result){
            res.json(result)
        }
    ).catch(
        function (erro) {
            console.log(erro);

            console.log(
                "\n Houve um erro ao realizar a listagem de collabs! Erro:",
                erro.sqlMessage 
            );
            res.status(500).json(erro.sqlMessage)
        }
    )
}


module.exports = {
    cadastrar,
    listar
}