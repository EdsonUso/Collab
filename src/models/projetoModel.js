var database = require('../databases/config')

function cadastrar(fkCollab, nome, descricao){
    var sqlInstruction = `INSERT INTO projeto (fkCollab, nome, descricao) VALUES (${fkCollab}, '${nome}', '${descricao}');`;
    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}


function listar(fkCollab){
    var sqlInstruction = `SELECT * FROM projeto WHERE fkCollab = ${fkCollab}`
    console.log("Executanto a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}

module.exports = {
    cadastrar,
    listar
}