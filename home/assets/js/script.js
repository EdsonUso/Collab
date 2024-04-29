const showModalPerfil = () => {
    const modal = document.getElementById('modal-papel');

    modal.showModal();

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();

        }
    });
}



showModalPerfil();