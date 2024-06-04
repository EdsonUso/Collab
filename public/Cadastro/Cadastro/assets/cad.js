
sessionStorage.NEW_USER = false;

let senhaValida = false;

function validarCadastro(senha, confirmar, email) {

  if(senha != confirmar){
    title_confirm.style.display = 'none'
    alert_confirm.style.display = 'block';
    alert_confirm.innrtHTML = "As senhas não são iguais!"
  }else{
    alert_confirm.style.display = 'none'
    title_confirm.style.display = 'block'
  }

  let temMaiscula = false;
  let temMinuscula = false;
  let temNum = false;
  let temEspecial = false;

  //CRIANDO ARRAY PARA VALORES ESPECIAIS
  let especiais = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', '|', ';', ':', ',', '.', '<', '>', '?'];

  //LIMPANDO CAMPO DE ALERT DA SENHA
  alert_senha.innerHTML = '';

  //FOR PARA VALIDAÇÃO
  for (let posicaoChar = 0; posicaoChar < senha.length; posicaoChar++) {
    let letra = senha[posicaoChar];

    if (letra >= 'A' && letra <= 'Z') {
      temMaiscula = true;
    }

    if (letra >= 'a' && letra <= 'z') {
      temMinuscula = true;
    }

    if (letra >= '0' && letra <= '9') {
      temNum = true;
    }

    if (especiais.indexOf(letra) !== -1) {
      temEspecial = true;
    }

  }

  if (!temMaiscula) {
    alert_senha.style.display = 'block';
    alert_senha.innerHTML = 'A senha deve conter pelo menos uma letra maiscula';
  }

  if (!temMinuscula) {
    alert_senha.style.display = 'block';
    alert_senha.innerHTML = 'A senha deve conter pelo menos uma letra minuscula';
  }

  if (!temNum) {
    alert_senha.style.display = 'block';
    alert_senha.innerHTML = 'A senha deve conter pelo menos um numero';
  }

  if (!temEspecial) {
    alert_senha.style.display = 'block';
    alert_senha.innerHTML = 'A senha deve conter pelo menos 1 caractere especial';
  }

  if (temMaiscula && temMinuscula && temNum && temEspecial && (senha == confirmar)) {
    alert_senha.innerHTML = '';
    senhaValida = true
  }

}




function cadastrar() {
  var nomeVar = nome_input.value
  var senhaVar = senha_input.value;
  var emailVar = email_input.value
  var confirmarVar = confirmacao_senha_input.value

  validarCadastro(senhaVar, confirmarVar, emailVar)
  if (senhaValida) {
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

  };

}

console.log(sessionStorage.NEW_USER)
