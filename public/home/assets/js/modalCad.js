//Função para detecção do tema
function detectionColor() {
    var theme = "dark" //padrão


    console.log(sessionStorage.NEW_USER)
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "light") {
            theme = "light";
        }
    } else if (!window.matchMedia) {
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        theme = "light"
    }

    if (theme == "light") {
        document.documentElement.setAttribute("data-theme", "light");
    }
}
//FIM DA FUNÇÃO DETECÇÃO DE CORES========================================================================
//CHAMADA DA FUNÇÃO DETECÇÃO DE CORES====================================================================
detectionColor();




const form = document.querySelector(".modal-form")

fetch("../../tipoUsuario/listar", {
    method: "GET"
}).then(function(resposta) {
    resposta.json().then((listaTipos) =>{
        listaTipos.forEach(tipo =>{
            const button = document.createElement('button');
            button.className = 'button-modal-config';
            button.textContent = tipo.tipo.charAt(0).toUpperCase() + tipo.tipo.slice(1);
            button.setAttribute('onclick', `setRole('${tipo.tipo}', ${tipo.id})`);
            form.appendChild(button);

        })
    })
})


//FUNÇÃO PARA APENAS CRIAR O MODAL AO ENTRAR NA PAGINA HOME ==============================================
const showModalPerfil = () => {
    const modal = document.getElementById('modal_papel');

    modal.showModal();

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();

        }
    });
}

if (sessionStorage.NEW_USER == "true") {
    showModalPerfil();
}

//FIM=====================================================================================================

//ARRAYS PARA CLASSIFICAÇÃO DO 
const optionProgramador = ['Iniciante', 'Estudante', 'Avançado', 'Profissional', 'Pleno', 'Sênior'];
const optionDesigner = ['Iniciante', 'Estudante', 'Profissional', 'Avançado'];
const optionModelador = ['Iniciante', 'Intermediário', 'Avançado', 'Profissional'];
const optionMusico = ['Iniciante', 'Amador', 'Semi-profissional', 'Profissional', 'Veterano'];

let chosen = []

function setRole(role, id) {
    //pegando o modal novamente ('talvez a logica não esteja das melhores')
    const modal = document.getElementById('modal_papel')

    //pegando o  form modal e colocando em uma variavel
    const form = document.getElementById('area_form')

    //criando o botão de dentro do modal dinamicamente
    const divButton = document.createElement('div')
    const nextButton = document.createElement('button');
    const textButton = document.createTextNode('Proximo')

    //Adicionando classes para os elementos criados dinamicamente
    divButton.classList.add('area-button-next');
    nextButton.classList.add('modal-button-next');


    if (document.querySelector('.modal-button-next') == null) {
        nextButton.appendChild(textButton)
        form.appendChild(divButton);
        divButton.appendChild(nextButton);
    }


    nextButton.addEventListener('click', () => {

        fetch("../usuario/definirTipo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idTipoServer: id,
                idUsuarioServer: sessionStorage.ID_USUARIO
            })
        }).then(function (resposta){
            console.log("resposta: " + resposta);

        }).catch(function(erro){
            console.log(`#ERRO: ${erro}`)
        })

        
        modal.innerHTML = '';// limpando o modal para os proximos elementos

        const divTitulo = document.createElement('div')
        const titulo = document.createElement('p')
        const textTitulo = document.createTextNode('Qual o nivel da sua formação?')


        divTitulo.classList.add('area-titulo');
        titulo.classList.add('titulo');

        divTitulo.appendChild(titulo);
        titulo.appendChild(textTitulo);

        const boxCards = document.createElement('div')
        boxCards.classList.add('box-cards')

        const divCards = document.createElement('div');
        divCards.classList.add('area-cards');

        modal.appendChild(divTitulo)
        modal.appendChild(boxCards);
        boxCards.appendChild(divCards)
        //criando e inserindo a div que vai receber os cards no html

        let option = optionProgramador;

        if (role == 'designer') {
            option = optionDesigner;
        }

        if (role == 'modelador') {
            option = optionModelador
        }

        if (role == 'musico') {
            option = optionMusico
        }

        //tentando converter para for normal 

        for (let i = 0; i < option.length; i++) {
            const card = document.createElement('button');
            card.classList.add('card');

            card.textContent = option[i];

            card.addEventListener('click', () => {


                const divButton = document.createElement('div')
                const nextButton = document.createElement('button');
                const textButton = document.createTextNode('Proximo')

                //Adicionando classes para os elementos criados dinamicamente
                divButton.setAttribute('id', 'next_button')
                divButton.classList.add('area-button-next');
                nextButton.classList.add('modal-button-next');


                if (document.querySelector('.modal-button-next') == null) {
                    nextButton.appendChild(textButton)
                    modal.appendChild(divButton);
                    divButton.appendChild(nextButton);
                }

                nextButton.addEventListener('click', () => {

                    modal.innerHTML = ''

                    modal.classList.add('inspirations', 'modal-config')

                    const divCheckbox = document.createElement('div');
                    divCheckbox.classList.add('area-games');

                    const titleCheckbox = document.createElement('p')
                    const textTitle = document.createTextNode('O que te inspira a fazer seus jogos?')
                    titleCheckbox.classList.add('titulo-inspiration')

                    titleCheckbox.appendChild(textTitle)
                    modal.append(titleCheckbox)

                    fetch("../../jogoInspirador/listar", {
                        method: "GET",
                    })
                        .then(function (resposta) {
                            resposta.json().then((games) => {
                                games.forEach((game) => {

                                    const checkbox = document.createElement('input');
                                    checkbox.type = 'checkbox';
                                    checkbox.id = `checkbox${game.id}`;

                                    const label = document.createElement('label');
                                    label.htmlFor = `checkbox${game.nome}`;

                                    const img = document.createElement('img');

                                    img.onerror = function () {
                                        img.onerror = null;
                                        img.src = `assets/modal-images/${game.nome}.jpg`;
                                    };

                                    img.src = `assets/modal-images/${game.nome}.png`;

                                    label.appendChild(img);

                                    const span = document.createElement('span');
                                    const limit = 7;
                                    span.textContent = game.nome;

                                    if (span.textContent.length > limit) {
                                        span.textContent = game.nome.substring(0, limit) + '...';
                                    }
                                    label.appendChild(span);

                                    divCheckbox.appendChild(checkbox);
                                    divCheckbox.appendChild(label);

                                    modal.appendChild(titleCheckbox);
                                    modal.appendChild(divCheckbox);

                                    checkbox.checked = !checkbox.checked;

                                    label.addEventListener('click', () => {
                                        !checkbox.checked;

                                        if (checkbox.checked) {
                                            if (!chosen.includes(game.id)) {
                                                chosen.push(game.id);
                                            }
                                            span.classList.add('checked');
                                        } else {
                                            const index = chosen.indexOf(game.id);
                                            if (index !== -1) {
                                                chosen.splice(index, 1);
                                            }
                                            span.classList.remove('checked');
                                        }

                                        if (chosen.length >= 3) {
                                            const divEnd = document.createElement('div');
                                            divEnd.classList.add('area-button-next');

                                            const endButton = document.createElement('button');
                                            endButton.classList.add('modal-button-next');
                                            endButton.setAttribute('id', 'buttonFinish');
                                            endButton.textContent = 'Finalizar';

                                            endButton.addEventListener('click', () => {

                                                chosen.forEach(jogo => {
                                                    fetch("../jogoUsuario/cadastrar", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            idJogoInspiradorServer: jogo,
                                                            idUsuarioServer: sessionStorage.ID_USUARIO
                                                        })
                                                    }).then(function (resposta) {
                                                        console.log("resposta: ", resposta);

                                                    }).catch(function (resposta) {
                                                        console.log(`#ERRO: ${resposta}`);
                                                    })
                                                })

                                                sessionStorage.NEW_USER = true;
                                                modal.close();
                                            });

                                            if (document.querySelector('.modal-button-next') == null) {
                                                divEnd.appendChild(endButton);
                                                modal.appendChild(divEnd);
                                            }
                                        }
                                    });

                                })
                            })
                        }).catch(function (error) {
                            console.error("Erro ao processar resposta:", error);
                        });
                    // modal.innerHTML = ''

                    // modal.classList.add('inspirations', 'modal-config')

                    //['Hollow Knight', 'Stardew Valley', 'Factorio', 'God of War', 'Stardew Valley', 'Factorio', 'Undertale', 'Cave Story'];

                    //['Cuphead', 'Ori and the Blind Forest', 'The Legend of Zelda Breath of the Wild', 'Child of Light', 'Gris', 'Limbo', 'Inside', 'Hyper Light Drifter'];
                    // ['Death Stranding', 'Final Fantasy VII Remake', 'Monster Hunter: World', 'God of War', 'Assassins Creed Odyssey', 'Red Dead Redemption 2', 'Cyberpunk 2077', 'The Last of Us Part II'];
                    // ['Journey', 'Celeste', 'The Witcher 3: Wild Hunt', 'Final Fantasy XV', 'NieR: Automata', 'Persona 5', 'Undertale', 'Bastion'];

                    // let inspiration = inspiracoesProgramacao;

                    // if (role == 'designer') {
                    //     inspiration = inspiracoesIlustracao;
                    // }

                    // if (role == 'musico') {
                    //     inspiration = inspiracoesMusica
                    // }

                    // if (role == 'modelador') {
                    //     inspiration = inspiracoesModelagem3D
                    // }




                    // inspiration.forEach((game) => {
                    //     const checkbox = document.createElement('input');
                    //     checkbox.type = 'checkbox';
                    //     checkbox.id = `checkbox${game}`;

                    //     const label = document.createElement('label');
                    //     label.htmlFor = `checkbox${game}`;

                    //     const img = document.createElement('img');

                    //     img.onerror = function () {
                    //         img.onerror = null;
                    //         img.src = `assets/modal-images/${game}.jpg`;
                    //     };

                    //     img.src = `assets/modal-images/${game}.png`;

                    //     label.appendChild(img);

                    //     const span = document.createElement('span');
                    //     const limit = 7;
                    //     span.textContent = game;

                    //     if (span.textContent.length > limit) {
                    //         span.textContent = game.substring(0, limit) + '...';
                    //     }
                    //     label.appendChild(span);

                    //     divCheckbox.appendChild(checkbox);
                    //     divCheckbox.appendChild(label);

                    //     modal.appendChild(titleCheckbox);
                    //     modal.appendChild(divCheckbox);

                    //     checkbox.checked = !checkbox.checked;

                    //     label.addEventListener('click', () => {
                    //         !checkbox.checked;

                    //         if (checkbox.checked) {
                    //             if (!chosen.includes(span.textContent)) {
                    //                 chosen.push(span.textContent);
                    //             }
                    //             span.classList.add('checked');
                    //         } else {
                    //             const index = chosen.indexOf(span.textContent);
                    //             if (index !== -1) {
                    //                 chosen.splice(index, 1);
                    //             }
                    //             span.classList.remove('checked');
                    //         }

                    //         if (chosen.length >= 3) {
                    //             const divEnd = document.createElement('div');
                    //             divEnd.classList.add('area-button-next');

                    //             const endButton = document.createElement('button');
                    //             endButton.classList.add('modal-button-next');
                    //             endButton.setAttribute('id', 'buttonFinish');
                    //             endButton.textContent = 'Finalizar';

                    //             endButton.addEventListener('click', () => {
                    //                 modal.close();
                    //             });

                    //             if (document.querySelector('.modal-button-next') == null) {
                    //                 divEnd.appendChild(endButton);
                    //                 modal.appendChild(divEnd);
                    //             }
                    //         }
                    //     });
                    // });



                })

            })



            divCards.appendChild(card);
        }



        // option.forEach(option => {
        //     const card = document.createElement('div');
        //     card.classList.add('card');
        //     card.textContent = option;

        //     card.addEventListener('click', () => {
        //         alert(`Selecionado: ${option}`);
        //     });
        //     divCards.appendChild(card);
        // });



    })

}









