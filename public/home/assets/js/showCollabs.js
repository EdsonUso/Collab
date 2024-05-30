


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
        resposta.json().then(Listcollabs => {
            Listcollabs.forEach((collab, index) => {
                console.log("COLLAB", collab)
                let divBoxCollab = document.createElement("div");
                divBoxCollab.className = "box-collab";
                divBoxCollab.id = "select_collab";
                divBoxCollab.setAttribute("value", collab.collabId)

                // Criação do elemento div com a classe "img-collab"
                let divImgCollab = document.createElement("div");
                divImgCollab.className = "img-collab";
                divImgCollab.setAttribute("for", "collab");

                // Criação do elemento img com a classe "img-collab-img"
                let imgCollab = document.createElement("img");
                imgCollab.src = `../../data-images/${collab.foto}`;
                imgCollab.alt = "";
                imgCollab.className = "img-collab-img";

                // Adicionar a imagem como filho do div com a classe "img-collab"
                divImgCollab.appendChild(imgCollab);

                // Criação do elemento span com a classe "collab-name"
                let spanCollabName = document.createElement("span");
                spanCollabName.className = "collab-name";
                spanCollabName.id = `span_collab_${index}`;
                spanCollabName.innerText = collab.collabName;

                // Criação do elemento i com a classe "fas fa-chevron-right"
                let iArrowCollab = document.createElement("i");
                iArrowCollab.className = "fas fa-chevron-right";
                iArrowCollab.id = `arrow_collab_${index}`;

                // Adicionar todos os elementos criados como filhos do div com a classe "box-collab"
                divBoxCollab.appendChild(divImgCollab);
                divBoxCollab.appendChild(spanCollabName);
                divBoxCollab.appendChild(iArrowCollab);

                // Criação do elemento div com a classe "area-members"
                let divAreaMembers = document.createElement("div");
                divAreaMembers.className = "area-members";
                divAreaMembers.id = `area_members_${index}`;

                // Adicionar a estrutura criada ao elemento com o id "parentElementId" (o elemento pai onde você quer adicionar essa estrutura)
                let showCollabs = document.getElementById("div_show_collabs");
                showCollabs.appendChild(divBoxCollab);
                showCollabs.appendChild(divAreaMembers);
            })
            const collabs = document.querySelectorAll('.box-collab');
            let checked = false;
            console.log(collabs)

            //TUDO ISSO PROVAVELMENTE VAI VIR COMO UM ARRAY DE OBJETOS COM AS INSFORMAÇÕES DOS USUARIOS 

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

                        fetch("../membro/listar", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                idCollabServer: collab.getAttribute("value")
                            })
                        })
                        .then(
                            function (resposta) {
                                console.log(resposta)

                                resposta.json().then(listUsers => {
                                    listUsers.forEach(user => {
                                        const nickname = user.nome;

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
                                    })
                                })
                            })
                    }
                });
            });
        })
    })





// Criação do elemento div com a classe "box-collab"


