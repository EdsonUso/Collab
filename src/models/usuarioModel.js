var database = require('../databases/config')

function autenticar(email, senha){
    var sqlInstruction = `SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';`;

    console.log(`executando a instrução ${sqlInstruction}`)

    return database.executar(sqlInstruction)
};


function cadastrar(nome, email, senha){
    var sqlInstruction = `INSERT INTO usuario(nome, email, senha) VALUES('${nome}', '${email}', '${senha}');`;

    console.log(`executando a instrução ${sqlInstruction}`)
    return database.executar(sqlInstruction)

}

module.exports ={
    autenticar, 
    cadastrar
}

