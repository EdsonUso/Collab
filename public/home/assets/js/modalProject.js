const buttonProject = document.getElementById('buttonCreateProject')
const modalProject = document.getElementById('modalCreateProject')
const buttonCad = document.getElementById('button_cad_project')


buttonProject.addEventListener('click', () => {
    modalProject.style.display = "flex"
    modalProject.classList.add('open-modal')

    listarCollabs()


})

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        modalProject.style.display = "none"
    }
})


function listarCollabs() {
    fetch("../collab/listar", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO
        })
    })
        .then(function (resposta) {
            resposta.json().then((collabs) => {
                collabs.forEach(collab => {
                    select_collabs.innerHTML += `<option value="${collab.collabId}">${collab.collabName}</option>`

                })
            })
        }).catch(function (error) {
            console.error("Erro ao listar collabs:", error);
        })
}



buttonCad.addEventListener('click', () => {
    const nomeProject = input_nome_project.value;
    const descProject = text_desc.value
    const idCollab = select_collabs.value 
    fetch("../projeto/cadastrar", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            idCollabServer: idCollab,
            nomeProjectServer: nomeProject,
            descProjectServer: descProject
        })
    }).then(function (resposta) {
        console.log(resposta)
    })
        .catch(function (erro) {
            console.log("Houve um erro ao realizar o cadastro do projeto:", erro)
        })

        modalProject.close()
        modalProject.style.display = "none"
})

