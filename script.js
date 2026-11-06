const navLinks = document.querySelector('nav');
const hamburger = document.getElementById('hamburger');

if(hamburger) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('hidden');
    });
}

const form = document.getElementById("myForm");
const successCard = document.getElementById("successCard");
const checkIcon = document.getElementById("check-icon");

// Function to open the modal
function openDemoModal(url) {
    const modal = document.getElementById('demoModal');
    const iframe = document.getElementById('demoIframe');
    const urlInput = document.getElementById('demoUrlInput');
    const externalLink = document.getElementById('demoExternalLink');

    // Make sure we have a valid URL or fallback
    const targetUrl = url || 'https://your-app.vercel.app';

    // Set initial URL
    iframe.src = targetUrl;
    if (urlInput) urlInput.value = targetUrl;
    if (externalLink) externalLink.href = targetUrl;

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

// Function triggered when submitting the form (pressing Enter or clicking Go)
function handleUrlSubmit(event) {
    // 1. CRITICAL: Stop the form from submitting and refreshing your page
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const urlInput = document.getElementById('demoUrlInput');
    const iframe = document.getElementById('demoIframe');
    const externalLink = document.getElementById('demoExternalLink');

    if (!urlInput || !iframe) return false;

    let inputUrl = urlInput.value.trim();

    // 2. Automatically prepend https:// if missing
    if (inputUrl && !/^https?:\/\//i.test(inputUrl)) {
        inputUrl = 'https://' + inputUrl;
        urlInput.value = inputUrl;
    }

    // 3. Force iframe to load the new URL
    if (inputUrl) {
        iframe.src = inputUrl;
        if (externalLink) externalLink.href = inputUrl;
    }

    return false; // Extra safety guard against page submit
}

// Function to close modal
function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    const iframe = document.getElementById('demoIframe');

    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
    if (iframe) iframe.src = 'about:blank'; // Clear iframe
    document.body.style.overflow = '';
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDemoModal();
});


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

const toastButton = document.getElementById('toastBtn');
toastButton.addEventListener('click', () => {
    const toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
});