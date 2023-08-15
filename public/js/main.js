document.addEventListener("DOMContentLoaded", function () {
    const collapseButton = document.querySelector(".navbar-toggler");
    const collapseElement = document.querySelector("#colNav");

    collapseButton.addEventListener("click", function () {

      const isCollapsed = collapseElement.classList.contains("show");

      if (isCollapsed) {
        collapseElement.classList.remove("show");
      } else {
        collapseElement.classList.add("show");
      }
    });
});

function navigateToLogin() {
  window.location.href = '/login';
};