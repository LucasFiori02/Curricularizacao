  const steps = document.querySelectorAll(".step");
  const stepper = document.querySelector(".stepper");
  const stepContents = document.querySelectorAll(".step-content");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnProximo = document.getElementById("btnProximo");
  const btnVoltarMenu = document.querySelectorAll(".btn-menu");

  let currentStep = 0;

  function updateProgressLine(step) {
    const progressPercent = (step) / (steps.length - 1) * 100;
    stepper.style.setProperty('--progress-width', progressPercent + '%');
  }

  function showStep(step) {
    stepContents.forEach((content, i) => {
      content.classList.toggle("active", i === step);
    });

    steps.forEach((stepElem, i) => {
      stepElem.classList.remove("active", "completed");
      if(i < step) stepElem.classList.add("completed");
      if(i === step) stepElem.classList.add("active");
    });

    btnAnterior.style.display = step === 0 ? "none" : "inline-block";
    btnProximo.style.display = step === stepContents.length - 1 ? "none" : "inline-block";

    updateProgressLine(step);
  }

  btnAnterior.addEventListener("click", () => {
    if(currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  btnProximo.addEventListener("click", () => {
    if(currentStep < stepContents.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });

  showStep(currentStep);

  const checkboxTemOutros = document.getElementById("temOutrosAnimais");
  const detalhesOutrosAnimais = document.getElementById("outrosAnimaisDetalhes");

  checkboxTemOutros.addEventListener("change", () => {
    detalhesOutrosAnimais.style.display = checkboxTemOutros.checked ? "block" : "none";
    if (!checkboxTemOutros.checked) {
      detalhesOutrosAnimais.querySelectorAll("input").forEach(input => {
        if (input.type === "checkbox") input.checked = false;
        else input.value = "";
      });
    }});

  btnVoltarMenu.forEach(element => {
    element.addEventListener("click", function () {
      window.location.href = "/initial.html";
    });
  });