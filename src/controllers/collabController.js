var collabModel = require("../models/collabModel")


function cadastrar(req, res){
    console.log(req.file)
    console.log(req.body)
    var foto = req.file.filename;
    var nome = req.body.nome;

    var collab = {foto, nome}

    collabModel.cadastrar(collab)
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
    var idUsuario = req.body.idUsuarioServer
    collabModel.listar(idUsuario).then(
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

function listarPopular(req, res){
    collabModel.listarPopular().then(
        function (resultado){
            res.status(200).json(resultado)
        }
    ).catch(erro =>{
        console.log(erro.sqlMessage)
    })
    res.status(500).json(erro.sqlMessage)
}


module.exports = {
    cadastrar,
    listar,
    listarPopular
}