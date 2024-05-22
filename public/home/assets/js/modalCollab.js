const buttonOpen = document.getElementById('button_new_collab');
const modal = document.getElementById('modalCreateCollab');

buttonOpen.addEventListener('click', () => {
    modal.style.display = "flex";
});

const button = document.getElementById('buttonAddMember');

button.addEventListener('click', () => {
    const modalMembros = document.getElementById('modalMembros');

    fetch("../../usuario/listar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO
        }),
    }).then(function (resposta) {
        resposta.json().then((listaUsuarios) => {
            listaUsuarios.forEach(usuario => {
                modalMembros.innerHTML +=
                    `<div class="box-member-add" id="member">
                        <div class="img-member" for="collab">
                            <img src="assets/modal-images/${usuario.nome}.png" alt="" class="img-member-img">
                        </div>
                        <span class="member-name-add" id="span_member">${usuario.nome}</span>
                    </div>`;

                const divMembers = document.querySelectorAll('.box-member-add');

                divMembers.forEach(divMember => {
                    divMember.addEventListener('click', () => {
                        const users = document.querySelectorAll('.membro');

                        if (users.length <= 4) {
                            // Criando os elementos
                            let card = document.createElement('div');
                            let areaImagem = document.createElement('div');
                            let nome = document.createElement('p');

                            let imagem = document.createElement('img');
                            areaImagem.appendChild(imagem);

                            areaImagem.classList.add('area-imagem');
                            card.className = 'membro';
                            imagem.src = `../home/assets/feed-images/${usuario.nome}.jpg`;
                            imagem.alt = `${usuario.nome}`;
                            nome.textContent = `${usuario.nome}`;

                            // Adicionando elementos ao card
                            card.appendChild(areaImagem);
                            card.appendChild(nome);

                            // Adicionando card ao container
                            var areaMembros = document.querySelector('.area-membros');
                            areaMembros.appendChild(card);
                        }
                    });
                });
            });
        });
    });

    modalMembros.style.display = "block";
});

document.addEventListener('DOMContentLoaded', () => {
    const fotoCollab = document.getElementById('fotoCollab');
    const inputFile = document.getElementById('input_file');

    fotoCollab.addEventListener('click', () => {
        inputFile.click();
    });

    inputFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fotoCollab.innerHTML = `<img src="${e.target.result}" alt="Foto da Collab">`;
            };
            reader.readAsDataURL(file);
        }
    });
});

const buttonCreate = document.getElementById('buttonCreateCollab')

buttonCreate.addEventListener('click', () => {
    modal.style.display = "none";
});
