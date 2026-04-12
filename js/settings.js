const main     = document.querySelector('.main-content');
const btnLight  = document.getElementById('btnLight');
const btnDark   = document.getElementById('btnDark');

// ── Apply active style to selected button ──
function setActive(selected) {
    [btnLight, btnDark, btnSystem].forEach(btn => btn.classList.remove('active'));
    selected.classList.add('active');
}

// ── Light ──────────────────────────────────
btnLight.addEventListener('click', () => {
    main.classList.remove('dark', 'system');
    main.classList.add('light');
    setActive(btnLight);
    localStorage.setItem('theme', 'light');
});

// ── Dark ───────────────────────────────────
btnDark.addEventListener('click', () => {
    main.classList.remove('light', 'system');
    main.classList.add('dark');
    setActive(btnDark);
    localStorage.setItem('theme', 'dark');
});


// ── Load saved theme on page open ──────────
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') {
        main.classList.add('dark');
        setActive(btnDark);
    } else {
        main.classList.add('light');
        setActive(btnLight);
    }
});