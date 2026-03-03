document.addEventListener('DOMContentLoaded', () => {
    // Animação de Revelação ao Rolar
    const elementosRevelar = document.querySelectorAll('.revelar');

    const observadorRevelar = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animar-aparecer');
            }
        });
    }, { threshold: 0.1 });

    elementosRevelar.forEach(el => observadorRevelar.observe(el));

    // Efeito da Barra de Navegação ao Rolar
    const navegacao = document.querySelector('.barra-navegacao');
    window.addEventListener('scroll', () => {
        if (navegacao) {
            if (window.scrollY > 50) {
                navegacao.classList.add('rolada');
            } else {
                navegacao.classList.remove('rolada');
            }
        }
    });

    // Lógica do Slideshow
    const contentoresSlideshow = document.querySelectorAll('.contentor-slideshow');

    contentoresSlideshow.forEach(contentor => {
        const slides = contentor.querySelectorAll('.slide');
        const botaoProx = contentor.querySelector('.seta-prox');
        const botaoAnt = contentor.querySelector('.seta-ant');
        let slideAtual = 0;

        function mostrarSlide(indice) {
            slides.forEach(slide => slide.classList.remove('ativo'));
            slideAtual = (indice + slides.length) % slides.length;
            slides[slideAtual].classList.add('ativo');
        }

        if (botaoProx) {
            botaoProx.addEventListener('click', () => mostrarSlide(slideAtual + 1));
        }

        if (botaoAnt) {
            botaoAnt.addEventListener('click', () => mostrarSlide(slideAtual - 1));
        }

        // Troca automática a cada 5 segundos
        setInterval(() => mostrarSlide(slideAtual + 1), 5000);
    });
});
