// Pega a role do usuário salva no localStorage
const roleUsuario = localStorage.getItem("userRole");
const btnGestor = document.getElementById("btnGestor");

if (roleUsuario === "gestor") {
  btnGestor.style.display = "inline-block"; // mostra botão
} else {
  btnGestor.style.display = "none"; // garante que voluntários não vejam
}

btnGestor.addEventListener("click", () => {
    window.location.href = "./gestor/gestor.html"; 
});