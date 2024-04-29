const aliens = document.querySelectorAll('svg[class^="alien-"]');

let isDragging = false;
thisAlien = null
let offsetX, offsetY;

aliens.forEach(alien => {

    alien.addEventListener('mousedown', (event) => {
        isDragging = true;
        thisAlien = alien;

        const { left, top } = alien.getBoundingClientRect();
        offsetX = event.clientX - left;
        offsetY = event.clientY - top
    });

    alien.addEventListener('mouseup', () => {
        isDragging = false;
        thisAlien = null
    })


    document.addEventListener('mousemove', (event) => {
        if (isDragging && thisAlien) {
            const { clientX, clientY } = event;
            thisAlien.style.left = `${clientX - offsetX}px`
            thisAlien.style.top = `${clientY - offsetY}px`

        }
    })
})



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

detectionColor();

//identify the toggle switch HTML element
const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
    if (e.target.checked) {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.checked = true;
    } else {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = false;
    }
}

//listener for changing themes
toggleSwitch.addEventListener('change', switchTheme, false);

//pre-check the dark-theme checkbox if dark-theme is set
if (document.documentElement.getAttribute("data-theme") == "light") {
    toggleSwitch.checked = true;
}
