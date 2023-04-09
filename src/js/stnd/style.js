$(document).ready(function () {
    $("#change-theme").click(changeTheme);
});

const excludedNavbarElements = document.getElementsByClassName("header");

function changeTheme() {
    const elements = document.querySelectorAll('*');
    const themeIcon = document.getElementById('theme-icon');
    const excludedResultElement = document.getElementById("result");
    const excludedCancelBtn = document.getElementById("cancelBtn");

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

    for (let i = 0; i < excludedNavbarElements.length; i++) {
        excludedNavbarElements[i].setAttribute("data-bs-theme", "light");
        excludedNavbarElements[i].classList.toggle("bg-dark-subtle");
    }

    // Set the background-color of the display area for the current calculation and cancel button
    excludedResultElement.classList.toggle("result");
    excludedResultElement.classList.toggle("result-dark");
    excludedCancelBtn.classList.toggle("btn-outline-light");
    excludedCancelBtn.classList.toggle("btn-outline-dark");

    // Change theme icon
    themeIcon.classList.toggle("bi-sun");
    themeIcon.classList.toggle("bi-moon");
}