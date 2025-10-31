const btnVoltarMenu = document.querySelectorAll(".btn-menu");


btnVoltarMenu.forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = "./initial.html";
  });
});

const form = document.getElementById("animal-form");
const steps = Array.from(document.querySelectorAll(".form-step"));
let currentStep = 0;

const showStep = (index) => {
  steps.forEach((step, i) =>
    step.classList.toggle("form-step-active", i === index)
  );
};
showStep(currentStep);

// Botões next e prev
document.querySelectorAll(".btn-next").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});
document.querySelectorAll(".btn-prev").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

// Envio do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const data = {
    nome: formData.get("nome"),
    tipo: formData.get("tipo"),
    porte: formData.get("porte"),
    sexo: formData.get("sexo"),
    idade_meses: parseInt(formData.get("idade_meses")),
    saude: formData.get("saude"),
    status: formData.get("status"),
    necessidades_especiais: formData.get("necessidades_especiais") || null,
    data_adocao: formData.get("data_adocao") || null,
    tutor_nome: formData.get("tutor_nome") || null,
    tutor_contato: formData.get("tutor_contato") || null,
    temperamento: formData.get("temperamento"),
    data_resgate: formData.get("data_resgate") || null,
    peso: parseFloat(formData.get("peso")),
  };

  
  const fotosInput = document.querySelector('input[name="fotos"]');
  if (fotosInput.files.length > 0) {
    for (let file of fotosInput.files) {
      formData.append("fotos", file); // Adiciona cada arquivo de foto ao FormData
    }
  }

  try {
    const res = await fetch("http://localhost:3000/animais", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const respData = await res.json();
      alert("Animal cadastrado com sucesso!");
      console.log(respData);
      form.reset();
      currentStep = 0;
    }
  } catch (err) {
    console.error(err);
  }
  window.location.href = "/html/gestor/gestor.html";
});

