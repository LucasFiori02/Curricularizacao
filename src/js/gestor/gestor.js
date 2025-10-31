btnSair = document.getElementById('btnSair');
btnVerForms = document.getElementById('btnVerForms');
btnCadastro = document.getElementById('btnCadastro');

btnSair.addEventListener('click', () => {
    window.location.href = '/html/initial.html'; // redireciona para a página inicial
});

btnVerForms.addEventListener('click', () => {
    window.location.href = "./gestorFormularios.html"; // redireciona para a página de formulários
});

btnCadastro.addEventListener('click', () => {
    window.location.href = "./cadastroAnimal.html"; // redireciona para a página de cadastro de animal
});