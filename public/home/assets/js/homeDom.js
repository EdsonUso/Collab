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

const likes = document.querySelectorAll('#post_like');

let isChecked = false;
likes.forEach(like => {
    like.addEventListener('click', () => {       
        isChecked = !isChecked
        if (isChecked) {
            like.classList.remove('far');
            like.classList.add('fas');
        } else {
            like.classList.remove('fas');
            like.classList.add('far');
        }

    })
})


let projectChecked = false; 

const ProjectBoxes = document.querySelectorAll('.box-most-project');

ProjectBoxes.forEach((project, index)=>{

   
    project.addEventListener('click', ()=>{
        projectChecked = !projectChecked;
        const arrow = document.querySelector(`#arrow_project_${index}`)
        const output = document.querySelector(`#desc_project_${index}`)
        const coversProject = document.querySelectorAll('.img-project')
        const collabs = document.querySelectorAll('.box-collab')

        if(!projectChecked){
            arrow.classList.remove('fa-chevron-down');
            arrow.classList.add('fa-chevron-right');

            coversProject.forEach(cover =>{
                cover.parentNode.removeChild(cover);
            })

            collabs.forEach(collab =>{
                collab.parentNode.removeChild(collab)
            })

        }else{
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


