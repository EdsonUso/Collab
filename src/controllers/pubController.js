var pubModel = require("../models/pubModel.js")

function cadastrar(req, res) {
    var image = req.file.filename;

    var {idCollab, desc} = req.body

    console.log(req.body)

    var pub = {idCollab, desc, image}

    pubModel.cadastrar(pub)
        .then(resultado => {
            res.status(200).send("Publicação cadastrada!", resultado);
        }).catch(erro => {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro da publicação! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listar(req, res){
    pubModel.listar().then(resultado =>{
        res.status(200).json(resultado)
    })
}

function curtir(req, res) {
    var id = req.params.id; 
    console.log(`Recebido pedido para curtir a publicação com ID: ${id}`);

    pubModel.curtir(id)
        .then(resultado => {
            console.log("Resultado da operação de curtir:", resultado);
            res.status(200).json({ mensagem: "Curtida incrementada com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao incrementar curtida:", erro);
            res.status(500).json({ mensagem: "Erro ao incrementar curtida", erro });
        });
}


function descurtir(req, res) {
    var id = req.params.id;
    console.log(`Recebido pedido para descurtir a publicação com ID: ${id}`);

    pubModel.descurtir(id)
        .then(resultado => {
            console.log("Resultado da operação de descurtir:", resultado);
            res.status(200).json({ mensagem: "Curtida decrementada com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao decrementar curtida:", erro);
            res.status(500).json({ mensagem: "Erro ao decrementar curtida", erro });
        });
}




module.exports = {
    cadastrar,
    listar,
    curtir,
    descurtir
}