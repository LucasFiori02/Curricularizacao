document.addEventListener('DOMContentLoaded', () => {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const animalImage = document.getElementById('animal-image');


    const images = [
        'img/animal1.webp',
        'img/animal2.webp',
        'img/animal3.webp' 
    ];
    let currentImageIndex = 0;

    function updateImage() {
        if (images.length > 0) {
            animalImage.src = images[currentImageIndex];
        }
    }

    if (prevArrow && nextArrow && animalImage) {
        if (images.length <= 1) {
            prevArrow.style.display = 'none';
            nextArrow.style.display = 'none';
        } else {
            prevArrow.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateImage();
            });

            nextArrow.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateImage();
            });
        }
        // Inicializa a imagem
        updateImage(); 
    } else {
        console.warn('Elementos do carrossel não encontrados.');
    }

    const downloadMedicoButton = document.querySelector('.download-button:nth-of-type(1)');
    const downloadAnimalButton = document.querySelector('.download-button:nth-of-type(2)');
    const loginButton = document.querySelector('.login-button');
    const backButton = document.querySelector('.back-button');

    if(downloadMedicoButton) {
        downloadMedicoButton.addEventListener('click', () => {
            alert('Funcionalidade "Baixar Histórico Médico" a ser implementada.');
            // Exemplo: window.location.href = '/caminho/para/historico_medico.pdf';
        });
    }

    if(downloadAnimalButton) {
        downloadAnimalButton.addEventListener('click', () => {
            alert('Funcionalidade "Baixar Histórico Animal" a ser implementada.');
            // Exemplo: window.location.href = '/caminho/para/historico_animal.pdf';
        });
    }

    if(loginButton) {
        loginButton.addEventListener('click', () => {
            alert('Funcionalidade "Login" a ser implementada.');
            // Exemplo: window.location.href = '/login';
        });
    }

    if(backButton) {
        backButton.addEventListener('click', () => {
            alert('Funcionalidade "Voltar" a ser implementada.');
            // Exemplo: window.history.back();
        });
    }
});

