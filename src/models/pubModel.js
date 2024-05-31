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
    c.foto,
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

function listarPeriodo(){
    var sqlInstruction = `SELECT
    COUNT(*) AS total,
    (SELECT COUNT(*) FROM publicacao WHERE YEARWEEK(dtCriacao) = YEARWEEK(CURRENT_DATE())) AS semana,
    (SELECT COUNT(*) FROM publicacao WHERE MONTH(dtCriacao) = MONTH(CURRENT_DATE()) AND YEAR(dtCriacao) = YEAR(CURRENT_DATE())) AS mes,
    (SELECT COUNT(*) FROM publicacao WHERE DATE(dtCriacao) = DATE(CURRENT_DATE())) AS dia
     FROM publicacao;`

     console.log("Executando a instrução sql", sqlInstruction)

     return database.executar(sqlInstruction)
}



module.exports = {
    cadastrar,
    listar,
    curtir,
    descurtir,
    listarPeriodo
}