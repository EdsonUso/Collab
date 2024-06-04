const buttonOpen = document.getElementById('button_new_collab');
const modal = document.getElementById('modalCreateCollab');

buttonOpen.addEventListener('click', () => {
    modal.style.display = "flex";
});


document.addEventListener('keydown', function(event) {
    if(event.key === "Escape"){
        modal.style.display = "none"
    }
})

const button = document.getElementById('buttonAddMember');

const listaUsuariosListados = [];
const listaUsuariosSelecionados = [];


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
            listaUsuarios.forEach((usuario, index) => {

                console.log(usuario)
                console.log(usuario.id)
                console.log(usuario.nome)

                if (!listaUsuariosListados.includes(usuario)) {
                    modalMembros.innerHTML +=
                        `<div class="box-member-add" id="${index}">
                        <div class="img-member" for="collab">
                            <img src="assets/feed-images/Frame.png" alt="" class="img-member-img">
                        </div>
                        <span class="member-name-add" id="span_member">${usuario.nome}</span>
                    </div>`;

                    listaUsuariosListados.push(usuario)

                }


                const divMembers = document.querySelectorAll('.box-member-add');
                console.log(divMembers)
                const users = document.querySelectorAll('.membro');

                divMembers.forEach(divMember => {
                    divMember.addEventListener('click', () => {
                        modalMembros.innerHTML = ''
                        adicionarUsuario(listaUsuariosListados[divMember.id]);
                        console.log(listaUsuariosListados[divMember.id])
                    })
                })

                function adicionarUsuario(u) {
                    if (users.length <= 4) {
                        // Criando os elementos
                        let card = document.createElement('div');
                        let areaImagem = document.createElement('div');
                        let nome = document.createElement('p');

                        let imagem = document.createElement('img');
                        areaImagem.appendChild(imagem);

                        areaImagem.classList.add('area-imagem');
                        card.className = 'membro';
                        imagem.src = `../home/assets/feed-images/${u.nome}.jpg`;
                        nome.textContent = `${u.nome}`;

                        // Adicionando elementos ao card
                        card.appendChild(areaImagem);
                        card.appendChild(nome);

                        // Adicionando card ao container
                        var areaMembros = document.querySelector('.area-membros');
                        areaMembros.appendChild(card);
                    }

                    listaUsuariosSelecionados.push(u)
                    console.log("LISTA DE USUARIOS", listaUsuariosSelecionados)

                    modalMembros.close();
                    modalMembros.style.display = "none"

                }
            });
        });
    });

    modalMembros.style.display = "block";
});


let imageCollab = ''
document.addEventListener('DOMContentLoaded', () => {
    const fotoCollab = document.getElementById('fotoCollab');
    const inputFile = document.getElementById('input_file');

    fotoCollab.addEventListener('click', () => {
        inputFile.click();
    });

    inputFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        console.log("FILE NOME", file.name)
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fotoCollab.innerHTML = `<img src="${e.target.result}" alt="Foto da Collab">`;
            };
            console.log(file.name)
            imageCollab = file
            console.log(imageCollab)
            
            reader.readAsDataURL(file);
            
        }
    });
});

const buttonCreate = document.getElementById('buttonCreateCollab')

buttonCreate.addEventListener('click', () => {

    const nomeCollab = input_nome_collab.value
    console.log(nomeCollab)

    modal.style.display = "none";
    const formData = new FormData();

    formData.append('foto', imageCollab);
    formData.append('nome', nomeCollab);
    

    fetch("../collab/cadastrar", {
        method: "POST",
        body: formData
    }).then(function (resposta) {
        console.log("Resposta da primeira requisição:", resposta);

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log("JSON da resposta:", json);
                console.log("ID da collab:", json.id);
                //CADASTRO DO USUARIO QUE ESTÁ CRIANDO A COLLAB
                fetch("../membro/cadastrar", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        idCollabServer: json.insertId,
                        idUsuarioServer: sessionStorage.ID_USUARIO
                    })
                }).then(function (resposta) {
                    if (resposta.ok) {
                        //CADASTRO DOS OUTROS USUARIOS QUE FAZEM PARTE DA COLLAB
                        listaUsuariosSelecionados.forEach(usuario => {
                            console.log("ID DO USUARIO", usuario.id)

                            fetch("../membro/cadastrar", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    idCollabServer: json.insertId,
                                    idUsuarioServer: usuario.id
                                })
                            }).then(function (resposta) {
                                console.log("Resposta da segunda requisição:", resposta);
                                if (resposta.ok) {
                                    return resposta.json();
                                } else {
                                    throw new Error("Resposta não OK da segunda requisição: " + resposta.status);
                                }
                            }).then(function (json) {
                                console.log("JSON da segunda resposta:", json);
                            }).catch(function (erro) {
                                console.log(`#ERRO na segunda requisição: ${erro}`);
                            });
                        });
                        location.reload(true)

                    } else {
                        throw new Error("Resposta não OK para cadastro do criador: " + resposta.status);
                    }
                }).catch(function (erro) {
                    console.log("ERRO", erro)
                })


            }).catch(function (erro) {
                console.log(`#ERRO ao analisar o JSON da primeira resposta: ${erro}`);
            });
        } else {
            console.log("Resposta não OK:", resposta.status);
        }

      




    }).catch(function (erro) {
        console.log(`#ERRO: ${erro}`)
    })
});
