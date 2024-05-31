var database = require('../databases/config')

function cadastrar(projeto){

    console.log()
    var sqlInstruction = `INSERT INTO projeto (fkCollab, nome, descricao, foto) VALUES (${projeto.idCollab}, '${projeto.nome}', '${projeto.descricao}', '${projeto.foto}');`;
    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}



function listar(fkUsuario){
    var sqlInstruction = `SELECT * FROM projeto 
    WHERE fkCollab IN (SELECT c.id FROM collab as c 
        join membrosCollab as mc ON c.id = mc.fkCollab 
        WHERE mc.fkUsuario = ${fkUsuario}) ORDER BY id DESC LIMIT 3;;`
    console.log("Executanto a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}

module.exports = {
    cadastrar,
    listar
}