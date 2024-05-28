const inputMake = document.getElementById('input_make_post')
const modalPost = document.getElementById('modalCreatePost')

inputMake.addEventListener('click', ()=>{
    modalPost.style.display = 'flex'
})

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        modalPost.style.display = "none"
    }
})