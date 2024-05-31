let projectChecked = false;

fetch("../collab/popular", {
    method: "GET", 
})
.then(function (resposta) {
    resposta.json().then(projectsList => {
        const projectsContainer = document.getElementById('containterMostPopular');
        projectsList.forEach((project, index) => {
            // Criar div principal
            const boxMostProject = document.createElement('div');
            boxMostProject.classList.add('box-most-project');

            // Criar contêiner da imagem
            const imgMostProject = document.createElement('div');
            imgMostProject.classList.add('img-most-project');

            // Criar imagem do projeto
            const imgElement = document.createElement('img');
            imgElement.src = `../../../data-images/${project.fotoCollab}`;
            imgElement.alt = project.nomeCollab;
            imgElement.classList.add('img-most-project-img');

            // Adicionar imagem ao contêiner da imagem
            imgMostProject.appendChild(imgElement);

            // Criar span para o nome do projeto
            const projectNameSpan = document.createElement('span');
            projectNameSpan.classList.add('project-name');
            projectNameSpan.id = `span_project_${index}`;
            projectNameSpan.textContent = project.nomeCollab;

            // Criar ícone de seta
            const arrowIcon = document.createElement('i');
            arrowIcon.classList.add('fas', 'fa-chevron-right');
            arrowIcon.id = `arrow_project_${index}`;

            // Adicionar elementos à div principal
            boxMostProject.appendChild(imgMostProject);
            boxMostProject.appendChild(projectNameSpan);
            boxMostProject.appendChild(arrowIcon);

            // Adicionar a div principal ao contêiner de projetos
            projectsContainer.appendChild(boxMostProject);

            // Criar e adicionar a descrição do projeto
            const descProject = document.createElement('div');
            descProject.classList.add('box-desc-project');
            descProject.id = `desc_project_${index}`;
            projectsContainer.appendChild(descProject);

            // Adicionar evento de clique à div principal do projeto
            boxMostProject.addEventListener('click', () => {
                projectChecked = !projectChecked;
                const arrow = document.querySelector(`#arrow_project_${index}`);
                const output = document.querySelector(`#desc_project_${index}`);
                const coversProject = document.querySelectorAll('.img-project');
                const collabs = document.querySelectorAll('.box-collab');

                if (!projectChecked) {
                    arrow.classList.remove('fa-chevron-down');
                    arrow.classList.add('fa-chevron-right');

                    coversProject.forEach(cover => {
                        cover.parentNode.removeChild(cover);
                    });

                    collabs.forEach(collab => {
                        collab.parentNode.removeChild(collab);
                    });

                } else {
                    arrow.classList.remove('fa-chevron-right');
                    arrow.classList.add('fa-chevron-down');

                    const boxCollab = document.createElement('div');
                    boxCollab.classList.add('box-collab');

                    const imgCollabdiv = document.createElement('div');
                    imgCollabdiv.classList.add('img-collab');

                    const imgCollab = document.createElement('img');
                    imgCollab.classList.add('img-collab-img');
                    imgCollab.src = `../../../data-images/${project.fotoCollab}`;

                    const nameCollab = document.createElement('span');
                    nameCollab.classList.add('nome-collab');
                    nameCollab.textContent = project.nomeUltimoProjeto;

                    const coverProject = document.createElement('div');
                    coverProject.classList.add('img-project');

                    const imgProject = document.createElement('img');
                    imgProject.classList.add('img-project-img');
                    imgProject.src = `../../../data-images/${project.fotoUltimoProjeto}`;

                    coverProject.appendChild(imgProject);
                    output.appendChild(coverProject);
                    imgCollabdiv.appendChild(imgCollab);
                    boxCollab.appendChild(imgCollabdiv);
                    boxCollab.appendChild(nameCollab);

                    output.appendChild(boxCollab);
                }
            });
        });
    });
})
.catch(function (erro){
    console.log("Houve um erro ao fazer a listagem", erro);
});
