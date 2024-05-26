var database = require("../databases/config");

function cadastrar(fkCollab, fkUsuarioCriado, fkUsuario){
    var sqlInstruction = `INSERT INTO membrosCollab (fkCollab, fkUsuario, dtCriacao) VALUES 
    (${fkCollab}, ${fkUsuarioCriado}, now());`
    
    var sqlInstruction2 = `INSERT INTO membrosCollab (fkCollab, fkUsuario, dtCriacao) VALUES (${fkCollab}, ${fkUsuario}, now());`;

    console.log("Executando a instrução sql:", sqlInstruction2)

    database.executar(sqlInstruction)

    return database.executar(sqlInstruction2)
}

module.exports = {
    cadastrar
}