var database = require('../databases/config')

function autenticar(email, senha){
    var sqlInstruction = `SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';`;

    console.log(`executando a instrução ${sqlInstruction}`)

    return database.executar(sqlInstruction)
};


function cadastrar(nome, email, senha){
    var sqlInstruction = `INSERT INTO usuario(nome, email, senha, dtCriacao) VALUES('${nome}', '${email}', '${senha}', now());`;

    console.log(`executando a instrução ${sqlInstruction}`)
    return database.executar(sqlInstruction)

}

function definirTipo(fkTipo, idUsuario){
    var sqlInstruction = `UPDATE usuario SET fkTipoUsuario = ${fkTipo}
	WHERE id = ${idUsuario};`;

    console.log("Executando a instrução:" + sqlInstruction)

    return database.executar(sqlInstruction)
}

module.exports ={
    autenticar, 
    cadastrar,
    definirTipo
}

