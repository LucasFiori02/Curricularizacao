document.addEventListener('DOMContentLoaded', () => {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const animalImage = document.getElementById('animal-image');


    const images = [
        'img/animal1.jpg',
        'img/animal2.jpg',
        'img/animal3.jpg' 
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
        updateImage(); 
    } else {
        console.warn('Elementos do carrossel não encontrados.');
    }

    const futureImplementation = document.querySelectorAll
    ('.download-button.animal, .download-button.medico, .adopt-button');

    futureImplementation.forEach(button => {
        button.addEventListener('click', () => {
            alert('Funcionalidade a ser implementada no futuro.');
        });
    });
});

const btnLogin = document.querySelectorAll('.login');

btnLogin.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = '/src/form.html';
    });
});

