const buttonProject = document.getElementById('buttonCreateProject')
const modalProject = document.getElementById('modalCreateProject')

buttonProject.addEventListener('click', () => {
    modalProject.style.display = "flex"

    listarCollabs()
})


function listarCollabs() {
    fetch("../collab/listar", {
        method: "POST",
        
    })
        .then(function (resposta) {
            resposta.json().then((collabs) => {
                collabs.forEach(collab => {
                    select_collabs.innerHTML += `<option value="${collab.nome}">${collab.nome}</option>`

                })
            })
        }).catch(function (error) {
            console.error("Erro ao listar collabs:", error);
        })
}
