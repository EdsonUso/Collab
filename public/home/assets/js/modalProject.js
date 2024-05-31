const buttonProject = document.getElementById('buttonCreateProject')
const modalProject = document.getElementById('modalCreateProject')
const buttonCad = document.getElementById('button_cad_project')




buttonProject.addEventListener('click', () => {
    modalProject.style.display = "flex"
    modalProject.classList.add('open-modal')

    listarCollabstoProject()


})

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        modalProject.style.display = "none"
    }
})




let imageProject = ''
document.addEventListener('DOMContentLoaded', () => {
    const fotoProject = document.getElementById('fotoProjectModal');
    const inputFile = document.getElementById('gameCover');

    fotoProject.addEventListener('click', () => {
        inputFile.click();
    });

    inputFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        console.log("FILE NOME", file.name)
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fotoProject.innerHTML = `<img src="${e.target.result}" alt="Foto ddo projeto">`;
            };
            console.log(file.name)
            imageProject = file
            console.log(imageProject)
            
            reader.readAsDataURL(file);
            
        }
    });
});

function listarCollabstoProject() {
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

    console.log('id no modal', idCollab)

    const formData = new FormData(); 
    console.log(formData)

    formData.append('foto', imageProject);
    formData.append('nomeProjectServer', nomeProject);
    formData.append('idCollabServer', idCollab);
    formData.append('descProjectServer', descProject);

    fetch("../projeto/cadastrar", {
        method: "POST",
        body: formData

    }).then(function (resposta) {
        console.log(resposta)
        
    })
        .catch(function (erro) {
            console.log("Houve um erro ao realizar o cadastro do projeto:", erro)
        })

        modalProject.close()
        modalProject.style.display = "none"
})








