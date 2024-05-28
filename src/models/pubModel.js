var database = require("../databases/config")


function cadastrar(fkCollab, fkProjeto, desc, img){
    var sqlInstruction = `INSERT INTO publicacao (fkCollab, fkProjeto, descricao, imgPub) VALUES
        (${fkCollab}, ${fkProjeto}, '${desc}', '${img}');`

        console.log("Executando a instrução sql:", sqlInstruction)

        return database.executar(sqlInstruction)
}




module.exports = {
    cadastrar   
}