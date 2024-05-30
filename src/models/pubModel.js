var database = require("../databases/config")


function cadastrar(pub){
    var sqlInstruction = `INSERT INTO publicacao (fkCollab, descricao, imgPub, dtCriacao) VALUES
        (${pub.idCollab}, '${pub.desc}', '${pub.image}', now());`

        console.log("Executando a instrução sql:", sqlInstruction)

        return database.executar(sqlInstruction)
}


function listar(){
    var sqlInstruction = `SELECT 
    p.id,
    p.descricao, 
    p.curtida,
    p.imgPub, 
    p.dtCriacao, 
    c.nome,
    TIMESTAMPDIFF(MINUTE, p.dtCriacao, NOW()) AS minutos
FROM 
    publicacao AS p
JOIN 
    collab AS c 
ON 
    p.fkCollab = c.id
ORDER BY 
    p.dtCriacao DESC;`;

console.log("Executando a instrução sql:", sqlInstruction)

return database.executar(sqlInstruction)

}

function curtir(id){
    var sqlInstruction = `UPDATE publicacao SET curtida = curtida + 1 WHERE id = ${id};`
    
    console.log("Executando a instrução sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}

function descurtir(id){
    var sqlInstruction = `UPDATE publicacao SET curtida = curtida - 1 WHERE id = ${id}`

    console.log("Executando a instruçao sql:", sqlInstruction)

    return database.executar(sqlInstruction)
}





module.exports = {
    cadastrar,
    listar,
    curtir,
    descurtir
}