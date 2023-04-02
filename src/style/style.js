$(document).ready(function () {
    $("#change-theme").click(changeTheme);
});

function changeTheme() {
    const elements = document.querySelectorAll('*');
    const excludedElements = document.getElementsByName('header');
    const themeIcon = document.getElementById('theme-icon');

    elements.forEach(element => {
        if (element.getAttribute("data-bs-theme") === "dark") {
            element.setAttribute("data-bs-theme", "light"); // Set to light mode
        } else {
            if (element.id.includes("Btn") || element.id.includes("button-addon2")) {
                element.classList.toggle("btn-outline-dark");
                element.classList.toggle("btn-outline-light");
            } else {
                element.setAttribute("data-bs-theme", "dark"); // Set to dark mode
            }
        }
    });

    // Set excluded elements (navbar elements) to light mode
    excludedElements.forEach(element => {
        element.setAttribute("data-bs-theme", "light");
        element.classList.toggle("btn-light");
        element.classList.toggle("bg-body-tertiary");
        element.classList.toggle("bg-dark-subtle");
    });

    // Change theme icon
    themeIcon.classList.toggle("bi-sun");
    themeIcon.classList.toggle("bi-moon");
}
