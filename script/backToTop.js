document.addEventListener("DOMContentLoaded", function() {
    const backToTop = document.querySelector('#back-to-top');
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    function checkScrollPosition() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    };
    window.onscroll = checkScrollPosition;
    checkScrollPosition();
});