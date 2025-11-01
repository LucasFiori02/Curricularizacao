btnSair = document.getElementById('btnSair');
btnVerForms = document.getElementById('btnVerForms');
btnCadastro = document.getElementById('btnCadastro');

btnSair.addEventListener('click', () => {
    window.location.href = '/html/initial.html'; 
});

btnVerForms.addEventListener('click', () => {
    window.location.href = "./gestorFormularios.html"; 
});

btnCadastro.addEventListener('click', () => {
    window.location.href = "./cadastroAnimal.html"; 
});