var database = require("../databases/config");

function cadastrar(nome){
    var sqlInstruction = `INSERT INTO collab (nome) VALUES ('${nome}')`
    
    console.info("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)


}

function listar(idUsuario){
    var sqlInstruction = `SELECT DISTINCT c.id AS collabId, c.nome AS collabName FROM usuario AS u 
    JOIN membroscollab AS mc ON u.id = mc.fkUsuario 
    JOIN collab AS c ON mc.fkCollab = c.id 
    WHERE mc.fkCollab IN(SELECT c.id FROM collab AS c JOIN membroscollab AS mc ON c.id = mc.fkCollab WHERE mc.fkUsuario = ${idUsuario}); `

    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
    
}



module.exports = {
    cadastrar,
    listar
}