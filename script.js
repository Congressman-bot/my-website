const navLinks = document.querySelector('nav');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});
