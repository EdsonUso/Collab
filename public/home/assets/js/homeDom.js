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



//FIM DA FUNÇÃO DETECÇÃO DE CORES========================================================================
//CHAMADA DA FUNÇÃO DETECÇÃO DE CORES====================================================================
detectionColor();

user_name_home.innerHTML = sessionStorage.NOME_USUARIO


function listarPosts() {
    fetch("../pub/listar", {
        method: "GET",
    }).then(resposta => {
        resposta.json().then((listaPubs) => {
            console.log(listaPubs);
            listaPubs.forEach(pub => {
                const containerPost = document.createElement('div');
                containerPost.classList.add('container-post');

                const boxPost = document.createElement('div');
                boxPost.classList.add('box-post');

                const areaPerfil = document.createElement('div');
                areaPerfil.classList.add('area-perfil');

                const boxPerfil = document.createElement('div');
                boxPerfil.classList.add('box-perfil');

                const imgPostPerfil = document.createElement('div');
                imgPostPerfil.classList.add('img-post-perfil');
                const imgPerfil = document.createElement('img');
                imgPerfil.src = `../data-images/${pub.foto}`;
                imgPerfil.alt = '';
                imgPostPerfil.appendChild(imgPerfil);

                const nomePerfil = document.createElement('div');
                nomePerfil.classList.add('nome-perfil');
                const pNomePerfil = document.createElement('p');
                pNomePerfil.textContent = pub.nome;
                nomePerfil.appendChild(pNomePerfil);

                const smallTimePost = document.createElement('small');
                smallTimePost.classList.add('time-post');
                smallTimePost.textContent = ` ${pub.minutos} min`;

                boxPerfil.appendChild(imgPostPerfil);
                boxPerfil.appendChild(nomePerfil);
                areaPerfil.appendChild(boxPerfil);
                areaPerfil.appendChild(smallTimePost);

                const legendaPost = document.createElement('div');
                legendaPost.classList.add('legenda-post');
                const spanLegenda = document.createElement('span');
                spanLegenda.textContent = pub.descricao;
                legendaPost.appendChild(spanLegenda);

                const boxMidiaPost = document.createElement('div');
                boxMidiaPost.classList.add('box-midia-post');

                const midiaPost = document.createElement('div');
                midiaPost.classList.add('midia-post');
                const imgMidia = document.createElement('img');
                imgMidia.src = `../data-images/${pub.imgPub}`;
                imgMidia.alt = '';
                midiaPost.appendChild(imgMidia);

                const descPost = document.createElement('div');
                descPost.classList.add('desc-post');

                const nameGame = document.createElement('div');
                nameGame.classList.add('name-game');
                const aGame = document.createElement('a');
                aGame.href = '';
                aGame.textContent = 'Cult of the lamb';
                nameGame.appendChild(aGame);

                const dataPost = document.createElement('div');
                dataPost.classList.add('data-post');
                const iStar = document.createElement('i');
                iStar.classList.add('fas', 'fa-star');
                const spanDataPost = document.createElement('span');
                spanDataPost.textContent = pub.curtida;
                dataPost.appendChild(iStar);
                dataPost.appendChild(spanDataPost);

                const interactionPost = document.createElement('div');
                interactionPost.classList.add('interaction-post');

                const likeDiv = document.createElement('div');
                likeDiv.classList.add('like');
                const iLike = document.createElement('i');
                iLike.classList.add('far', 'fa-star');
                iLike.dataset.postId = pub.id; // Adicionando data attribute
                iLike.id = `post_like_${pub.id}`; // Adicionando ID único
                likeDiv.appendChild(iLike);

                interactionPost.appendChild(likeDiv);

                descPost.appendChild(nameGame);
                descPost.appendChild(dataPost);
                descPost.appendChild(interactionPost);

                boxMidiaPost.appendChild(midiaPost);
                boxMidiaPost.appendChild(descPost);

                boxPost.appendChild(areaPerfil);
                boxPost.appendChild(legendaPost);
                boxPost.appendChild(boxMidiaPost);

                containerPost.appendChild(boxPost);

                // Adiciona o post ao contêiner na página
                document.getElementById('feedView').appendChild(containerPost);

                pegarEstrelas(pub.id); // Chama pegarEstrelas com o ID da publicação

            });
        });
    });
}

function pegarEstrelas(ref) {
    const likeButton = document.querySelector(`#post_like_${ref}`);
    console.log("likeButton", likeButton);

    starsClick(likeButton, ref);

    console.log(likeButton);
}


let isChecked = false;

function starsClick(likeButton, ref) {
    likeButton.addEventListener('click', () => {
        isChecked = !isChecked;
        const postId = likeButton.dataset.postId;

        if (isChecked) {
            likeButton.classList.remove('far');
            likeButton.classList.add('fas');

            fetch(`../pub/curtir/${postId}`, {
                method: "PUT"
            }).then(resposta => {
                console.log(resposta);
                return resposta.json();
            }).then(data => {
                console.log("Resposta da API ao curtir:", data);
            }).catch(erro => {
                console.log("Houve um erro ao cadastrar curtida", erro);
            });
        } else {
            likeButton.classList.remove('fas');
            likeButton.classList.add('far');

            fetch(`../pub/descurtir/${postId}`, {
                method: "PUT"
            }).then(resposta => {
                console.log(resposta);
                return resposta.json();
            }).then(data => {
                console.log("Resposta da API ao descurtir:", data);
            }).catch(erro => {
                console.log("Houve um erro ao descurtir", erro);
            });
        }
    });
}