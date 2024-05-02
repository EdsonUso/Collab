//Função para detecção do tema
function detectionColor() {
    var theme = "dark" //padrão


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

detectionColor();

const showModalPerfil = () => {
    const modal = document.getElementById('modal_papel');

    modal.showModal();

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();

        }
    });
}

showModalPerfil();

const optionProgramador = ['Iniciante', 'Estudante','Avançado', 'Profissional', 'Pleno', 'Sênior'];
const optionDesigner = ['Iniciante', 'Estudante', 'Profissional', 'Avançado'];
const optionModelador = ['Iniciante', 'Intermediário', 'Avançado', 'Profissional'];
const optionMusico = ['Iniciante', 'Amador', 'Semi-profissional', 'Profissional', 'Veterano'];

function setRole(role) {
    //pegando o modal novamente ('talvez a logica não esteja das melhores')
    const modal = document.getElementById('modal_papel')

    //pegando o  form modal e colocando em uma variavel
    const form = document.getElementById('area_form')

    console.log(role)

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

        if(role == 'modelador'){
            option = optionModelador
        }

        if(role == 'musico'){
            option = optionMusico
        }

        //tentando converter para for normal 

        for(let i = 0; i < option.length; i++){
            const card = document.createElement('button');
            card.classList.add('card');
            
            card.textContent = option[i];

            card.addEventListener('click', () => {

                const level = card.textContent;

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

                nextButton.addEventListener('click', () =>{
                    modal.innerHTML = ''


                    
                })

                setPerfil(level)
                
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

     

    const inspiracoesProgramacao = ['Hollow Knight', 'Stardew Valley', 'Factorio', 'God of War', 'Stardew Valley', 'Factorio', 'Undertale', 'Cave Story'];
    const inspiracoesIlustracao = ['Cuphead', 'Ori and the Blind Forest', 'The Legend of Zelda: Breath of the Wild', 'Child of Light', 'Gris', 'Limbo', 'Inside', 'Hyper Light Drifter']; 
    const inspiracoesModelagem3D = ['Death Stranding', 'Final Fantasy VII Remake', 'Monster Hunter: World', 'God of War', 'Assassins Creed Odyssey', 'Red Dead Redemption 2', 'Cyberpunk 2077', 'The Last of Us Part II'];
    const inspiracoesMusica = ['Journey', 'Celeste', 'The Witcher 3: Wild Hunt', 'Final Fantasy XV', 'NieR: Automata', 'Persona 5', 'Undertale', 'Bastion'];
    
    let inspiration = inspiracoesProgramacao;

    if(role == 'designer'){
        inspiration = inspiracoesIlustracao;
    }

    if(role == 'musico'){
        inspiration = inspiracoesMusica
    }

    if(role == 'modelador'){
        inspiration = inspiracoesModelagem3D
    }

    for(let i = 0; i <= inspiration.length; i++){
        //criar com checkboxes e labels, é possivel costumizar totalmente os labels

        //exemplo de customização
        // .custom-checkbox label img {
        //     width: 24px; /* Largura da imagem */
        //     height: 24px; /* Altura da imagem */
        //     position: absolute;
        //     left: 0;
        //     top: 50%;
        //     transform: translateY(-50%);
    }





}





