const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function setMobileMenuOpen(isOpen) {
    if (!hamburger || !mobileMenu) return;

    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    mobileMenu.inert = !isOpen;
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        setMobileMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    mobileMenu.addEventListener('click', (event) => {
        if (event.target.closest('[data-menu-close]') || event.target.closest('a')) {
            setMobileMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMobileMenuOpen(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) setMobileMenuOpen(false);
    });
}

const form = document.getElementById("myForm");
const successCard = document.getElementById("successCard");
const checkIcon = document.getElementById("check-icon");
const demoModal = document.getElementById('demoModal');
let previousBodyOverflow = '';
let toastTimeout;

function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('is-visible');
    }, 3000);
}

// Function to open the modal
function openDemoModal(url) {
    const modal = demoModal;
    const iframe = document.getElementById('demoIframe');
    const urlInput = document.getElementById('demoUrlInput');
    const externalLink = document.getElementById('demoExternalLink');
    if (!modal || !iframe) return;

    const targetUrl = url || 'https://your-app.vercel.app';
    iframe.src = targetUrl;
    if (urlInput) urlInput.value = targetUrl;
    if (externalLink) externalLink.href = targetUrl;

    if (!modal.classList.contains('is-open')) {
        previousBodyOverflow = document.body.style.overflow;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modal.inert = false;
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
    const modal = demoModal;
    const iframe = document.getElementById('demoIframe');

    if (!modal || !modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    if (iframe) iframe.src = 'about:blank';
    document.body.style.overflow = previousBodyOverflow;
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
if (toastButton) toastButton.addEventListener('click', showToast);