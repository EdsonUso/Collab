
sessionStorage.NEW_USER = false;

function cadastrar() {



    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;
 
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {

      return false;
    }
    
    // Enviando o valor da nova input
    fetch("/usuario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        sessionStorage.NEW_USER = true;
        console.log(sessionStorage.NEW_USER)
      
        if (resposta.ok) {
          alert("Cadastro realizado com sucesso!")
    
          window.location = "../Login/index.html";

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }

  console.log(sessionStorage.NEW_USER)
