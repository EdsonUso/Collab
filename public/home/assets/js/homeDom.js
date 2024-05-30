//Função para detecção do tema


function listarPosts() {

    fetch("../pub/listar", {
        method: "GET",
    }).then(resposta => {
        resposta.json().then((listaPubs) => {
            console.log(listaPubs)
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
                imgPerfil.src = '';
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
                iLike.id = 'post_like';
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

                pegarEstrelas(pub.id);

            })
        })
    }

    )

}

let stars;

function pegarEstrelas(ref) {
    stars = document.querySelectorAll('#post_like');
    console.log("stars", stars)

    starsClick(ref);
}


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

let isChecked = false;

localStorage.LIKE_POST = isChecked;
function starsClick(ref) {
    stars.forEach(like => {
        like.addEventListener('click', () => {
            isChecked = !isChecked
            if (isChecked) {
                like.classList.remove('far');
                like.classList.add('fas');

                fetch(`../pub/curtir/${ref}`, {
                    method: "PUT"
                }).then(resposta =>{
                    console.log(resposta)
                }).catch(erro =>{
                    console.log("Houve um erro ao cadastrar curtida", erro)
                })
            } else {
                like.classList.remove('fas');
                like.classList.add('far');

                fetch(`../pub/descurtir/${ref}`,{
                    method: "PUT"
                }).then(resposta =>{
                    console.log(resposta)
                }).catch(erro => {
                    console.log("Houve um erro ao descurtir", erro)
                })
            }

        })
    })
}


let projectChecked = false;

const ProjectBoxes = document.querySelectorAll('.box-most-project');

ProjectBoxes.forEach((project, index) => {


    project.addEventListener('click', () => {
        projectChecked = !projectChecked;
        const arrow = document.querySelector(`#arrow_project_${index}`)
        const output = document.querySelector(`#desc_project_${index}`)
        const coversProject = document.querySelectorAll('.img-project')
        const collabs = document.querySelectorAll('.box-collab')

        if (!projectChecked) {
            arrow.classList.remove('fa-chevron-down');
            arrow.classList.add('fa-chevron-right');

            coversProject.forEach(cover => {
                cover.parentNode.removeChild(cover);
            })

            collabs.forEach(collab => {
                collab.parentNode.removeChild(collab)
            })

        } else {
            arrow.classList.remove('fa-chevron-right');
            arrow.classList.add('fa-chevron-down');

            const boxCollab = document.createElement('div')
            boxCollab.classList.add('box-collab')

            const imgCollabdiv = document.createElement('div')
            imgCollabdiv.classList.add('img-collab')

            const imgCollab = document.createElement('img')
            imgCollab.classList.add('img-collab-img')

            const nameCollab = document.createElement('span')
            nameCollab.classList.add('nome-collab')
            nameCollab.textContent = 'Athos'

            const coverProject = document.createElement('div')
            coverProject.classList.add('img-project')

            const imgProject = document.createElement('img')
            imgProject.classList.add('img-project-img')

            imgProject.src = 'assets/feed-images/cult.jpg'



            coverProject.appendChild(imgProject)

            output.appendChild(coverProject)
            imgCollabdiv.appendChild(imgCollab)
            imgCollabdiv.appendChild(imgCollab)
            boxCollab.appendChild(imgCollabdiv)
            boxCollab.appendChild(nameCollab)

            output.appendChild(boxCollab)


        }
    })
})





