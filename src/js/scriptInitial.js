const futureImplementation = document.querySelectorAll(".adopt-button");

futureImplementation.forEach((button) => {
  button.addEventListener("click", () => {
    alert("Funcionalidade a ser implementada no futuro.");
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const cardsContainer = document.querySelector(".cards-container");

  // Seleciona checkboxes
  const especieCheckboxes = document.querySelectorAll(
    'input[data-filtro="especie"]'
  );
  const generoCheckboxes = document.querySelectorAll(
    'input[data-filtro="genero"]'
  );
  const porteCheckboxes = document.querySelectorAll(
    'input[data-filtro="porte"]'
  );

  let animais = [];

  function criarCard(animal) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${
        animal.animal_photos?.[0]?.url || "/img/default.jpg"
      }" alt="Imagem do Animal">
      <div class="info">
        <p>NOME: <span class="pet-name">${animal.nome}</span></p>
        <p>GÊNERO: <span class="pet-gender">${animal.sexo}</span></p>
        <p>IDADE: <span class="pet-age">${Math.floor(
          animal.idade_meses / 12
        )} anos</span></p>
        <p>PORTE: <span class="pet-size">${animal.porte}</span></p>
        <a class="detailBtn" href="./info.html?id=${animal.id}">DETALHES </a>
      </div>
      <a href="./form.html?id=${animal.id}"><button id="adopt-button" class="adopt-button btn">ADOTAR</button></a>
    `;
    cardsContainer.appendChild(card);
  }


  function renderizarAnimais() {
    cardsContainer.innerHTML = "";

    const especies = Array.from(especieCheckboxes)  // espécies selecionadas
      .filter((c) => c.checked)
      .map((c) => c.value.toLowerCase());

    const generos = Array.from(generoCheckboxes)  // gêneros selecionados
      .filter((c) => c.checked)
      .map((c) => c.value.toLowerCase());

    const portes = Array.from(porteCheckboxes)  // porte selecionados
      .filter((c) => c.checked)
      .map((c) => c.value.toLowerCase());

    const filtrados = animais.filter((animal) => {
      // converte todos os valores do animal para lowercase
      const tipo = (animal.tipo || "").toLowerCase();
      const sexo = (animal.sexo || "").toLowerCase();
      const porte = (animal.porte || "").toLowerCase();

      const especieOk = especies.length === 0 || especies.includes(tipo);
      const generoOk = generos.length === 0 || generos.includes(sexo);
      const porteOk = portes.length === 0 || portes.includes(porte);

      return especieOk && generoOk && porteOk;
    });

    filtrados.forEach(criarCard); // Cria os cards para os animais filtrados
  }

  async function carregarAnimais() {
    try {
      const res = await fetch("http://localhost:3000/animais");
      animais = await res.json();
      renderizarAnimais();
    } catch (err) {
      console.error("Erro ao buscar animais:", err);
    }
  }

  [...especieCheckboxes, ...generoCheckboxes, ...porteCheckboxes].forEach( 
    (checkbox) => {
      checkbox.addEventListener("change", renderizarAnimais);
    }
  );

  await carregarAnimais();
});
