const button = document.getElementById('buttonCreateCollab');

button.addEventListener('click', ()=>{

        // Criando os elementos
        let card = document.createElement('div');
        let areaImagem = document.createElement('div')
        let nome = document.createElement('p');

        let imagem = document.createElement('img');
        areaImagem.appendChild(imagem)    
        // Adicionando classes e conteúdo
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
})