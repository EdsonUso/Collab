var database = require('../databases/config')

function cadastrar(fkCollab, nome, descricao){
    var sqlInstruction = `INSERT INTO projeto (fkCollab, nome, descricao) VALUES (${fkCollab}, '${nome}', '${descricao}');`;
    console.log("Executando a instrução sql:", sqlInstruction)

    database.executar(sqlInstruction)
}


module.exports = {
    cadastrar
}