var database = require("../databases/config");

function cadastrar(fkCollab, fkUsuario){
    
    var sqlInstruction = `INSERT INTO membrosCollab (fkCollab, fkUsuario, dtCriacao) VALUES (${fkCollab}, ${fkUsuario}, now());`;

    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}

function listar(fkCollab){
    var sqlInstruction = `SELECT u.id, u.nome FROM usuario AS u JOIN membroscollab AS mc ON u.id = mc.fkUsuario JOIN collab AS c ON c.id = mc.fkCollab WHERE c.id = ${fkCollab};`

    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}

module.exports = {
    cadastrar,
    listar
}