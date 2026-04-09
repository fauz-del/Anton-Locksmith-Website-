/* ─── Smooth-scroll nav links ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = document.querySelector('.navbar').offsetHeight + 8;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ─── Active nav highlight on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a[data-section]');
const navHeight = () => document.querySelector('.navbar').offsetHeight;

function setActive() {
    let current = '';
    sections.forEach(sec => {
        if (window.pageYOffset >= sec.offsetTop - navHeight() - 60) {
            current = sec.id;
        }
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.section === current);
    });
}

window.addEventListener('scroll', setActive, { passive: true });
setActive();

/* ─── Hamburger / drawer ─── */
const ham = document.getElementById('ham');
const drawer = document.getElementById('drawer');

ham.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    ham.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

function closeDrawer() {
    drawer.classList.remove('open');
    ham.classList.remove('active');
    document.body.style.overflow = '';
}

drawer.addEventListener('click', e => {
    if (e.target === drawer) closeDrawer();
});

/* ─── Skill bar animation on scroll ─── */
const fills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

fills.forEach(f => skillObserver.observe(f));

/* ─── Form submit ─── */
function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('fs').style.display = 'block';
    e.target.reset();
}