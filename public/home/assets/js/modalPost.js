const inputMake = document.getElementById('input_make_post')
const modalPost = document.getElementById('modalCreatePost')

const buttonPhoto = document.getElementById('buttonCadPhotoPost')

inputMake.addEventListener('click', () => {
    modalPost.style.display = 'flex'

    listarCollabstoPost();
})

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        modalPost.style.display = "none"
    }
})


function listarCollabstoPost() {
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
                    select_collab_post.innerHTML += `<option value="(${collab.collabId})">${collab.collabName}</option>`
                    
                })
            })
        }).catch(function (error) {
            console.error("Erro ao listar collabs:", error);
        })
}



buttonPhoto.addEventListener('click', ()=>{
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fotoCollab.innerHTML = `<img src="${e.target.result}" alt="Foto da Collab">`;
        };
        reader.readAsDataURL(file);
    }
})