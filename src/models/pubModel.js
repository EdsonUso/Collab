var database = require("../databases/config")


function cadastrar(fkCollab, desc, img){
    var sqlInstruction = `INSERT INTO publicacao (fkCollab, fkProjeto, descricao, imgPub) VALUES
        (${fkCollab}, '${desc}', '${img}');`

        console.log("Executando a instrução sql:", sqlInstruction)

        return database.executar(sqlInstruction)
}




module.exports = {
    cadastrar   
}