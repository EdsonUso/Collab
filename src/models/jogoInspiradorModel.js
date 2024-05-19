var database = require("../databases/config")

function listar(){
    var sqlInstruction = `SELECT * FROM jogoInspirador;`;

    console.log("Executando a instrução sql:" + sqlInstruction)

    return database.executar(sqlInstruction)
}



module.exports = {
    listar
}