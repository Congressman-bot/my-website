const navLinks = document.querySelector('nav');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

const form = document.getElementById("myForm");
const successCard = document.getElementById("successCard");
const checkIcon = document.getElementById("check-icon");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // show success card
    successCard.classList.remove("hidden");
    checkIcon.classList.remove("animate");
    void checkIcon.offsetWidth;
    checkIcon.classList.add("animate");

    // wait 3 seconds
    setTimeout(() => {
        location.reload();
    }, 3000);
});