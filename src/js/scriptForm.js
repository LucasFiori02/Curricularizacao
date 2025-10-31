const steps = document.querySelectorAll(".step");
const stepper = document.querySelector(".stepper");
const stepContents = document.querySelectorAll(".step-content");
const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const btnVoltarMenu = document.querySelectorAll(".btn-menu");
const form = document.getElementById("multiStepForm");

let currentStep = 0;

function updateProgressLine(step) {
  const progressPercent = (step / (steps.length - 1)) * 100;
  stepper.style.setProperty("--progress-width", progressPercent + "%");
}

function showStep(step) {
  stepContents.forEach((content, i) => {
    content.classList.toggle("active", i === step);
  });

  steps.forEach((stepElem, i) => {
    stepElem.classList.remove("active", "completed");
    if (i < step) stepElem.classList.add("completed");
    if (i === step) stepElem.classList.add("active");
  });

  btnAnterior.style.display = step === 0 ? "none" : "inline-block";

  // Se estiver no último step mostra botão enviar, esconde próximo
  if (step === stepContents.length - 2) {
    btnProximo.style.display = "none";
    form.querySelector('button[type="submit"]').style.display = "inline-block";
  } else {
    btnProximo.style.display =
      step === stepContents.length - 1 ? "none" : "inline-block";
    form.querySelector('button[type="submit"]').style.display = "none";
  }

  updateProgressLine(step);
}

// Botões de navegação
btnAnterior.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

btnProximo.addEventListener("click", () => {
  if (currentStep < stepContents.length - 2) {
    currentStep++;
    showStep(currentStep);
  }
});

btnVoltarMenu.forEach((element) => {
  element.addEventListener("click", () => {
    window.location.href = "./initial.html";
  });
});

const checkboxTemOutros = document.getElementById("temOutrosAnimais");
const detalhesOutrosAnimais = document.getElementById("outrosAnimaisDetalhes");

checkboxTemOutros.addEventListener("change", () => {
  detalhesOutrosAnimais.style.display = checkboxTemOutros.checked
    ? "block"
    : "none";
  if (!checkboxTemOutros.checked) {
    detalhesOutrosAnimais.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox") input.checked = false;
      else input.value = "";
    });
  }
});

const btnForm = document.getElementById("btnForm");
// Validação antes do envio
btnForm.addEventListener("click", () => {
  if (!form.checkValidity()) {
    alert("Por favor, preencha todos os campos obrigatórios antes de enviar o formulário.");
    form.reportValidity();
    return;
  }
  form.requestSubmit(); // dispara o envio do form manualmente
});

// Envio do formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();


  const formData = new FormData(form);
  const data = {
    // Step 0
    nome_completo: formData.get("nomeCompleto"),
    cpf: formData.get("cpf"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    data_nascimento: formData.get("dataNascimento"),
    renda: formData.get("renda"),

    // Step 1
    cep: formData.get("cep"),
    rua: formData.get("rua"),
    numero: formData.get("numero"),
    cidade: formData.get("cidade"),
    estado: formData.get("estado"),
    bairro: formData.get("bairro"),
    complemento: formData.get("complemento"),

    // Step 2
    possui_outros_animais: formData.get("possuiOutrosAnimais") === "on",
    tipo_moradia: formData.get("tipoMoradia"),
    possui_espaco_animal: formData.get("possuiEspacoAnimal") === "on",
    ja_adotou_animal: formData.get("jaAdotouAnimal") === "on",
    motivo_adocao: formData.get("motivoAdocao"),

    // Step 3
    animal_interesse: formData.get("animalInteresse"),
    tipo_moradia_pet: formData.get("tipoMoradiaPet"),
    residencia_concorda: formData.get("residenciaConcorda") === "on",
    tem_outros_animais: formData.get("temOutrosAnimais") === "on",
    quantos_quais: formData.get("quantosQuais"),
    castrados_vacinados: formData.get("castradosVacinados") === "on",
    residencia_tem_telas: formData.get("residenciaTemTelas") === "on",
    animal_acesso_rua: formData.get("animalAcessoRua") === "on",

    // Step 4
    condicoes_manter_animal: formData.get("condicoesManterAnimal"),
    concorda_castracao: formData.get("concordaCastracao") === "on",
    concorda_taxa_adocao: formData.get("concordaTaxaAdocao") === "on",

    // Step 5
    documentos_urls: [],
  };

  try {
    const response = await fetch("http://localhost:3000/adocoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      // Avança para step de sucesso
      currentStep = stepContents.length - 1;
      showStep(currentStep);
      console.log("Formulário enviado com sucesso:", result);
    } else {
      alert("Erro ao enviar formulário: " + result.message);
    }
  } catch (err) {
    console.error("Erro ao enviar formulário:", err);
  }
});

// Inicializa
showStep(currentStep);
