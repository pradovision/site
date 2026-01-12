document.addEventListener('DOMContentLoaded', () => {
    // Carrossel de Cases
    const carouselTrack = document.querySelector('.carousel-track');
    const caseItems = document.querySelectorAll('.case-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const itemWidth = caseItems[0].clientWidth; // Largura de um item
    
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    // Navegação anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : caseItems.length - 1;
        updateCarousel();
    });

    // Navegação próxima
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < caseItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Ajustar carrossel em redimensionamento de janela
    window.addEventListener('resize', () => {
        // Recalcula a largura do item para garantir responsividade
        const newItemWidth = document.querySelector('.case-item').clientWidth;
        carouselTrack.style.transform = `translateX(${-currentIndex * newItemWidth}px)`;
    });

    // Animação de Scroll Suave para os links da Navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animação de elementos ao rolar (Exemplo simples com Intersection Observer)
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Opcional: remover ao sair da tela
            }
        });
    }, {
        threshold: 0.1 // 10% da seção visível para ativar
    });

    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('hidden'); // Adiciona classe inicial para animação CSS
    });
});