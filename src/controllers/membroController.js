var membroModel = require("../models/membroModel.js");

function cadastrar(req, res){
    var idCollab = req.body.idCollabServer;
    var idUsuario = req.body.idUsuarioServer;


    membroModel.cadastrar(idCollab, idUsuario)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}


module.exports = {
    cadastrar
}