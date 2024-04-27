const aliens = document.querySelectorAll('svg[class^="alien-"]');

let isDragging = false;
thisAlien = null
let offsetX, offsetY;

aliens.forEach(alien => {
    
    alien.addEventListener('mousedown', (event) => {
        isDragging = true;
        thisAlien = alien;

        const {left, top} = alien.getBoundingClientRect();
        offsetX = event.clientX - left;
        offsetY = event.clientY - top            
    });

    alien.addEventListener('mouseup', () =>{
        isDragging = false;
        thisAlien = null
    })


    document.addEventListener('mousemove' , (event) =>{
        if(isDragging && thisAlien) {
            const {clientX, clientY} = event;
            thisAlien.style.left = `${clientX - offsetX}px`
            thisAlien.style.top = `${clientY - offsetY}px`

        }
    })
})

