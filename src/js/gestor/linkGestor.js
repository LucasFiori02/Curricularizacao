const roleUsuario = localStorage.getItem("userRole");
const btnGestor = document.getElementById("btnGestor");

if (roleUsuario === "gestor") {
  btnGestor.style.display = "inline-block"; 
} else {
  btnGestor.style.display = "none"; // garante que voluntários não vejam
}

btnGestor.addEventListener("click", () => {
    window.location.href = "./gestor/gestor.html"; 
});