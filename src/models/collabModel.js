var database = require("../databases/config");

function cadastrar(nome){
    var sqlInstruction = `INSERT INTO collab (nome) VALUES ('${nome}')`
    
    console.info("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)


}

function listar(idUsuario){
    var sqlInstruction = `SELECT * FROM collab`

    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}



module.exports = {
    cadastrar,
    listar
}