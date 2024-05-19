var database = require("../databases/config")


function cadastrar(fkUsuario, fkJogoInspirador){
    var sqlInstruction = `INSERT INTO jogoInspiradorUsuario(fkUsuario, fkJogo) VALUES
    (${fkUsuario}, ${fkJogoInspirador});`;

    console.log("Executando a instrução sql:" + sqlInstruction);

    

    return database.executar(sqlInstruction)
}



module.exports = {
    cadastrar
}