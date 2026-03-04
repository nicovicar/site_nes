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

    // Lógica da Galeria e Modal
    const modal = document.getElementById('modal-galeria');
    const cardsGaleria = document.querySelectorAll('.cartao-galeria');
    const fecharModal = document.querySelector('.fechar-modal');
    const grelhaFotosModal = document.getElementById('modal-grelha-fotos');
    const modalTitulo = document.getElementById('modal-titulo');
    const btnSelecionarTodas = document.getElementById('btn-selecionar-todas');
    const btnDownloadSelecionadas = document.getElementById('btn-download-selecionadas');

    // Dados de exemplo para os álbuns
    const dadosAlbuns = {
        'album1': {
            titulo: 'Jornadas X - Melhores Momentos',
            fotos: [
                'assets/images/jornadas/cartaz.jpeg',
                'assets/images/direcao.jpeg',
                'assets/images/logo nes.png',
                'assets/images/nes_jornadas.png'
            ]
        }
    };

    function abrirModal(albumId) {
        const album = dadosAlbuns[albumId];
        if (!album) return;

        modalTitulo.textContent = album.titulo;
        grelhaFotosModal.innerHTML = '';

        album.fotos.forEach((foto, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'foto-modal-wrapper';
            wrapper.innerHTML = `
                <img src="${foto}" alt="Foto ${index + 1}">
                <div class="overlay-selecao"><i class="fas fa-check"></i></div>
                <button class="btn-download-direto" title="Baixar foto"><i class="fas fa-download"></i></button>
            `;

            // Toggle seleção
            wrapper.addEventListener('click', (e) => {
                if (e.target.closest('.btn-download-direto')) return;
                wrapper.classList.toggle('selecionada');
                atualizarBotaoDownload();
            });

            // Download direto
            wrapper.querySelector('.btn-download-direto').addEventListener('click', () => {
                baixarImagem(foto);
            });

            grelhaFotosModal.appendChild(wrapper);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impede scroll do fundo
    }

    function fecharModalGaleria() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function atualizarBotaoDownload() {
        const selecionadas = document.querySelectorAll('.foto-modal-wrapper.selecionada');
        btnDownloadSelecionadas.style.display = selecionadas.length > 0 ? 'inline-block' : 'none';
        btnDownloadSelecionadas.textContent = `Download Selecionadas (${selecionadas.length})`;
    }

    function baixarImagem(url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    cardsGaleria.forEach(card => {
        card.addEventListener('click', (e) => {
            // Se clicar nas setas do slideshow, não abre o modal
            if (e.target.closest('.seta-slideshow')) return;
            const albumId = card.getAttribute('data-album');
            abrirModal(albumId);
        });
    });

    fecharModal.addEventListener('click', fecharModalGaleria);
    window.addEventListener('click', (e) => {
        if (e.target === modal) fecharModalGaleria();
    });

    btnSelecionarTodas.addEventListener('click', () => {
        const wrappers = document.querySelectorAll('.foto-modal-wrapper');
        const todasSelecionadas = Array.from(wrappers).every(w => w.classList.contains('selecionada'));

        wrappers.forEach(w => {
            if (todasSelecionadas) w.classList.remove('selecionada');
            else w.classList.add('selecionada');
        });

        btnSelecionarTodas.textContent = todasSelecionadas ? 'Selecionar Todas' : 'Desmarcar Todas';
        atualizarBotaoDownload();
    });

    btnDownloadSelecionadas.addEventListener('click', () => {
        const selecionadas = document.querySelectorAll('.foto-modal-wrapper.selecionada img');
        selecionadas.forEach(img => baixarImagem(img.src));
    });
});
