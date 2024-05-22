



    
    if (sessionStorage.NEW_USER == "true") {
        showModalPerfil();
    }

const button = document.getElementById('buttonAddMember');

button.addEventListener('click', () => {
        const users = document.querySelectorAll(".membro")

        if (users.length <= 4) {
                // Criando os elementos
                let card = document.createElement('div');
                let areaImagem = document.createElement('div')
                let nome = document.createElement('p');

                console.log(users)
                let imagem = document.createElement('img');
                areaImagem.appendChild(imagem)

                areaImagem.classList.add('area-imagem')
                card.className = 'membro';
                imagem.src = '../home/assets/feed-images/cult.jpg';
                imagem.alt = 'Usuario';
                nome.textContent = 'Usuario';

                // Adicionando elementos ao card
                card.appendChild(areaImagem);
                card.appendChild(nome);

                // Adicionando card ao container
                var areaMembros = document.querySelector('.area-membros');
                areaMembros.appendChild(card)
        }


})



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
