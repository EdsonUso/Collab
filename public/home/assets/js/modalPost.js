const inputMake = document.getElementById('input_make_post')
const modalPost = document.getElementById('modalCreatePost')
const buttonPhoto = document.getElementById('buttonCadPhotoPost')
const buttonPost = document.getElementById('buttonPosting')



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


document.getElementById('buttonCadPhotoPost').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        const previewDiv = document.getElementById('previewPhotoPost');
        previewDiv.innerHTML = ''; // Limpa o conteúdo anterior
        previewDiv.appendChild(imgElement);
      };
      reader.readAsDataURL(file);
    }
  });


buttonPost.addEventListener('click', ()=>{
    const formData = new FormData();    

    formData.append('foto', buttonCadPhotoPost.files[0])
    formData.append('desc', activityPost.value);
    formData.append('idCollab', select_collab_post.value);

    console.log(select_collab_post.value)

    console.log(formData)

    cadastrarPublicacao(formData);
    modalPost.close()
    modalPost.style.display = "none"
})

function cadastrarPublicacao(form){
    console.log(form)
    fetch("../pub/cadastrar", {
        method: "POST", 

        body: form 
    }).then(function (resposta) {
        console.log("Aparentemente deu certo?", resposta)
        

    }).catch(function (error) {
        console.error("Erro ao listar collabs:", error);
    })
}