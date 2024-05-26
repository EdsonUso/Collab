var database = require("../databases/config");

function cadastrar(fkCollab, fkUsuario){
    
    var sqlInstruction = `INSERT INTO membrosCollab (fkCollab, fkUsuario, dtCriacao) VALUES (${fkCollab}, ${fkUsuario}, now());`;

    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}

module.exports = {
    cadastrar
}