$(document).ready(function () {
    $("#change-theme").click(changeTheme);
});

const excludedElements = document.getElementsByClassName("header");

function changeTheme() {
    const elements = document.querySelectorAll('*');
    const themeIcon = document.getElementById('theme-icon');
    elements.forEach(element => {
        if (element.getAttribute("data-bs-theme") === "dark") {
            element.setAttribute("data-bs-theme", "light"); // Set to light mode
        } else {
            if (element.id.includes("Btn") || element.id.includes("button-addon2")) {
                element.classList.toggle("btn-outline-dark");
                element.classList.toggle("btn-outline-light");
            } else if (element.id.includes("navbar-setting")) {
                element.classList.toggle("btn-light");
            }
            else {
                element.setAttribute("data-bs-theme", "dark"); // Set to dark mode
            }
        }
    });

    // console.log(excludedElements);

    for (let i = 0; i < excludedElements.length; i++) {
        excludedElements[i].setAttribute("data-bs-theme", "light");
        excludedElements[i].classList.toggle("bg-dark-subtle");
    }

    // Change theme icon
    themeIcon.classList.toggle("bi-sun");
    themeIcon.classList.toggle("bi-moon");
}
