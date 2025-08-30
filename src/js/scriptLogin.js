const formLogin = document.getElementById("login-form");
const formRegister = document.getElementById("register-form");


function showForm(form) { // Função para alternar formulários
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("register-form").classList.add("hidden");

  if (form === "register") {
    document.getElementById("register-form").classList.remove("hidden");
  } else {
    document.getElementById("login-form").classList.remove("hidden");
  }

  const linkLogin = document.getElementById("link-login");
  const linkRegister = document.getElementById("link-register");

  if (form === "login") {
    linkLogin.classList.add("hidden");
    linkRegister.classList.remove("hidden");
  } else if (form === "register") {
    linkLogin.classList.remove("hidden");
    linkRegister.classList.add("hidden");
  }
}


showForm("login"); // Inicializa mostrando o login

// ------------------- REGISTER -------------------
formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formRegister);
  const data = {
    nome: formData.get("username"), 
    email: formData.get("email"),
    senha: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:3000/usuarios/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
      formRegister.reset(); // limpa os campos
      showForm("login"); // volta para o login
    } else {
      alert("Erro ao cadastrar: " + result.message);
    }
  } catch (err) {
    alert("Erro ao cadastrar usuário");
  }
});

// ------------------- LOGIN -------------------
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formLogin);
  const data = {
    email: formData.get("email"),
    senha: formData.get("password"),
  };

  try {
    const response = await fetch("http://localhost:3000/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) { // redirecionar para a página inicial após login
      console.log("Usuário logado:", result.user);
      window.location.href = "initial.html";
    } else {
      alert("Erro ao logar: " + result.message);
    }
  } catch (err) {
    alert("Erro ao tentar logar");
  }
});
