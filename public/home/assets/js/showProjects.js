
const divProjects = document.getElementById('showProjects')

fetch("../projeto/listar", {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({
        idUsuarioServer: sessionStorage.ID_USUARIO
    })
}).then(function (resposta) {
    console.log("RESPOSTA", resposta)

    if(!resposta.ok){
        throw new Error(resposta.status) 
    }
    resposta.json().then(listProjects => {
        console.log(listProjects)
        listProjects.forEach(project => {
            const projetoDiv = document.createElement('div');
            projetoDiv.classList.add('projeto');

            // Cria o contêiner da imagem do projeto
            const imgProjetoDiv = document.createElement('div');
            imgProjetoDiv.classList.add('img-projeto');

            // Cria a imagem do projeto
            const imgProjeto = document.createElement('img');
            imgProjeto.src = `../../../data-images/${project.foto}`;
            imgProjeto.alt = '';
            imgProjeto.classList.add('img-projeto-img');

            // Adiciona a imagem ao contêiner da imagem
            imgProjetoDiv.appendChild(imgProjeto);

            // Cria o nome do projeto
            const nomeProjetoSpan = document.createElement('span');
            nomeProjetoSpan.classList.add('nome-projeto');
            nomeProjetoSpan.textContent = project.nome;

            // Adiciona o contêiner da imagem e o nome do projeto ao contêiner do projeto
            projetoDiv.appendChild(imgProjetoDiv);
            projetoDiv.appendChild(nomeProjetoSpan);

            // Adiciona o contêiner do projeto ao documento (por exemplo, ao body ou a uma div específica)
            divProjects.appendChild(projetoDiv);

        })
    })
}).catch(function (erro){
    console.log("Houve um erro ao fazer a listagem", erro)
}

)
