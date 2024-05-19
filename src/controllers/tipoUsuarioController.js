var tipoUsuarioModel = require("../models/tipoUsuarioModel");


function listar(req, res){
    tipoUsuarioModel.listar().then(resultado =>{
        res.status(200).json(resultado)
    })
}


module.exports = {
    listar
}
