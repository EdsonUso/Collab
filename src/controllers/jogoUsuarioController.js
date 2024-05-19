var jogoUsuarioModel = require("../models/jogoUsuarioModel");


function cadastrar(req, res) {

    var idUsuario = req.body.idUsuarioServer
    var idJogoInspirador = req.body.idJogoInspiradorServer;


    jogoUsuarioModel.cadastrar(idUsuario, idJogoInspirador)
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
