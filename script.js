// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.servico-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

document.querySelectorAll('.diferencial-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

document.querySelectorAll('.info-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

document.querySelectorAll('.depoimento-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

document.querySelectorAll('.credential-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// ===== CONTADOR DE ESTATÍSTICAS =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Observar seção de estatísticas
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
const form = document.querySelector('.contato-form form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        if (nome && email && telefone && assunto && mensagem) {
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.disabled = true;
            
            // Simular envio
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                button.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
                
                // Resetar formulário
                this.reset();
                
                // Restaurar botão após 3 segundos
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });
}

// ===== EFEITO PARALLAX NOS PARTICLES =====
const particles = document.querySelectorAll('.particle');
document.addEventListener('mousemove', (e) => {
    particles.forEach(particle => {
        const speed = particle.getAttribute('data-speed') || 5;
        const x = (window.innerWidth - e.clientX * speed) / 100;
        const y = (window.innerHeight - e.clientY * speed) / 100;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== ADICIONAR ESTILOS DINÂMICOS =====
const style = document.createElement('style');
style.textContent = `
    .servico-card,
    .diferencial-item,
    .info-item,
    .depoimento-card,
    .credential-item {
        opacity: 0;
    }

    .nav-links.active {
        display: flex !important;
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-links.active li {
        animation: slideInLeft 0.3s ease forwards;
    }

    .nav-links.active li:nth-child(1) { animation-delay: 0s; }
    .nav-links.active li:nth-child(2) { animation-delay: 0.1s; }
    .nav-links.active li:nth-child(3) { animation-delay: 0.2s; }
    .nav-links.active li:nth-child(4) { animation-delay: 0.3s; }
`;
document.head.appendChild(style);

// ===== SCROLL REVEAL PARA SEÇÕES =====
const revealSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});

// ===== HOVER EFFECT NOS CARDS =====
document.querySelectorAll('.servico-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== ANIMAÇÃO DE ENTRADA DO HERO =====
window.addEventListener('load', function() {
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-content h2');
    const heroText = document.querySelector('.hero-content p');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroBadge) heroBadge.style.animation = 'slideDown 0.8s ease';
    if (heroTitle) heroTitle.style.animation = 'slideDown 0.8s ease 0.2s both';
    if (heroText) heroText.style.animation = 'slideDown 0.8s ease 0.4s both';
    if (heroButtons) heroButtons.style.animation = 'slideDown 0.8s ease 0.6s both';
});

// ===== LOG DE CARREGAMENTO =====
console.log('✅ Landing page carregada com sucesso!');
console.log('🎨 Design: Moderno e Profissional');
console.log('⚖️ Especialidade: Direito');
console.log('📱 Responsivo: Sim');
