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



const search = document.getElementById('inputSearch');

search.addEventListener('click', () => {
    search.classList.add('no-background');
})
const areaMembers = document.querySelectorAll('.area-members');
const collabs = document.querySelectorAll('.box-collab');
const arrows = document.querySelectorAll('.fa-chevron-right');

let checked = false;

const members = ['User-01', 'User-02', 'User-03', 'User-04'];

collabs.forEach((collab, index) => {
    collab.addEventListener('click', () => {
        const arrow = document.querySelector(`#arrow_collab_${index}`);
        const areaMember = document.querySelector(`#area_members_${index}`);
        const collabName = document.querySelector(`#span_collab_${index}`)
        const boxMembers = document.querySelectorAll('.box-member');
        checked = !checked;

        if (!checked) {
            collab.classList.remove('activate');
            arrow.classList.remove('fa-chevron-down');
            arrow.classList.add('fa-chevron-right');
            collabName.classList.remove('activate')

            boxMembers.forEach(boxMember => {
                boxMember.parentNode.removeChild(boxMember);
            });

        } else {
            collab.classList.add('activate');
            collabName.classList.add('activate')

            arrow.classList.remove('fa-chevron-right');
            arrow.classList.add('fa-chevron-down');

            for (let i = 0; i < members.length; i++) {
                const nickname = members[i];

                const boxMember = document.createElement('div');
                boxMember.classList.add('box-member');
                boxMember.id = 'member';

                const imgMemberDiv = document.createElement('div');
                imgMemberDiv.classList.add('img-member');
                imgMemberDiv.setAttribute('for', 'collab');

                const imgMember = document.createElement('img');
                imgMember.src = 'assets/modal-images/Gris.png';
                imgMember.alt = '';
                imgMember.classList.add('img-member-img');

                imgMemberDiv.appendChild(imgMember);

                const memberName = document.createElement('span');
                memberName.classList.add('member-name');
                memberName.id = 'span_member';
                memberName.textContent = nickname;

                // Adiciona todos os elementos criados como filhos da areaMember
                boxMember.appendChild(imgMemberDiv);
                boxMember.appendChild(memberName);
                areaMember.appendChild(boxMember);
            }
        }
    });
});



