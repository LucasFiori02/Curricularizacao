// Implementar o carrossel de imagens







///////////////////////////////////

const futureImplementation = 
document.querySelectorAll('.adopt-button');

const btnLogin = document.querySelector('.login');

futureImplementation.forEach(button => {
    button.addEventListener('click', () => {
        alert('Funcionalidade a ser implementada no futuro.');
    });
});

btnLogin.addEventListener('click', () => {
    window.location.href = '/form.html';
});