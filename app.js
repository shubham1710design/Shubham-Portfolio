const typed = new Typed('#element', {
    strings: ['MERN Stack Developer', 'Web Developer', 'Full Stack Enthusiast'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
});

const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('main section[id]');
const skillsSection = document.getElementById('skills');
const progressSpans = document.querySelectorAll('.progress span');
const contactForm = document.getElementById('contactForm');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const scrollTopButton = document.createElement('button');
scrollTopButton.className = 'scroll-top';
scrollTopButton.type = 'button';
scrollTopButton.innerHTML = '&#8679;';
document.body.appendChild(scrollTopButton);

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateNavOnScroll() {
    const currentPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

        if (currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
            navLinks.forEach(item => item.classList.remove('active'));
            if (link) {
                link.classList.add('active');
            }
        }
    });
}

function updateNavStyle() {
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
        scrollTopButton.classList.add('show');
    } else {
        nav.classList.remove('nav-scrolled');
        scrollTopButton.classList.remove('show');
    }
}

function animateProgressBars() {
    progressSpans.forEach(span => {
        const targetValue = span.getAttribute('data-target') || span.style.width;
        if (targetValue) {
            span.style.width = targetValue;
        }
    });
}

progressSpans.forEach(span => {
    const width = span.style.width || '0%';
    span.dataset.target = width;
    span.style.width = '0%';
});

const observerOptions = {
    root: null,
    threshold: 0.18,
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { root: null, threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

window.addEventListener('scroll', () => {
    updateNavStyle();
    updateNavOnScroll();
});

function updateThemeIcon() {
    if (body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fa fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fa fa-moon"></i>';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.classList.toggle('light-theme', savedTheme === 'light');
    } else {
        body.classList.toggle('light-theme', !prefersDarkScheme.matches);
    }
    updateThemeIcon();
}

navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    navToggle.classList.toggle('open');
});

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', body.classList.contains('light-theme') ? 'light' : 'dark');
    updateThemeIcon();
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
        nav.classList.remove('nav-open');
        navToggle.classList.remove('open');
    });
});

loadTheme();

updateNavStyle();
updateNavOnScroll();

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
        alert('Thank you! Your message has been prepared to send.');
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        contactForm.reset();
    }, 700);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});
