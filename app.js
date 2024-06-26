var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });


var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

// var indexRouter = require("./src/ro utes/index");
var usuarioRouter = require("./src/routes/usuario");
var cadastroRouter = require("./src/routes/cadastro");
var jogoInspiradorRouter = require("./src/routes/jogoInspirador");
var jogoUsuarioRouter = require("./src/routes/jogoUsuario");
var tipoUsuarioRouter = require("./src/routes/tipoUsuario");
var collabRouter = require("./src/routes/collab")
var membroRouter = require("./src/routes/membro")
var projetoRouter = require("./src/routes/projeto");
var pubRouter = require("./src/routes/publicacao");


//ROTA TEMPORARIA PARA COSTUMIZAÇÃO DE CADASTRO E TESTE DE CRIAÇÃO DE USUARIO
app.use("/cadastro", express.static(path.join(__dirname)));


app.use(express.json());
app.use(express.urlencoded({limit: '10mb', extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/membro", membroRouter)
app.use("/Cadastro", cadastroRouter);
app.use("/usuario", usuarioRouter);
app.use("/jogoInspirador", jogoInspiradorRouter);
app.use("/jogoUsuario", jogoUsuarioRouter);
app.use("/tipoUsuario", tipoUsuarioRouter);
app.use("/collab", collabRouter);
app.use("/projeto", projetoRouter);
app.use("/pub", pubRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
