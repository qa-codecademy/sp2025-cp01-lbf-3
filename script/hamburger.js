document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navBtn = document.getElementById("button");

    hamburger.addEventListener('click', function() {
         hamburger.classList.toggle('open');
         mainNav.classList.toggle('active');
         navBtn.classList.toggle('btn-main');
    });
});