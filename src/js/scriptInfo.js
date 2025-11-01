document.addEventListener("DOMContentLoaded", async () => {
  const animalImage = document.getElementById("animal-image");
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  try {
    const urlParams = new URLSearchParams(window.location.search); 
    const animalId = urlParams.get("id");  

    if (!animalId) {
      alert("Animal não especificado!");
      return;
    }

    const res = await fetch(`http://localhost:3000/animais?id=${animalId}`);
    const data = await res.json();
    if (!data || data.length === 0) {
      alert("Animal não encontrado!");
      return;
    }

    const animal = data[0];

    // Preenche os detalhes do animal
    document.getElementById('animal-nome').textContent = animal.nome;
    document.getElementById('animal-sexo').textContent = animal.sexo;
    document.getElementById('animal-idade').textContent = animal.idade_meses;
    document.getElementById('animal-porte').textContent = animal.porte;
    document.getElementById('animal-temperamento').textContent = animal.temperamento || 'Não informado';
    document.getElementById('animal-status').textContent = animal.status;
    document.getElementById('animal-resgate').textContent = animal.data_resgate || 'Não informado';
    document.getElementById('animal-peso').textContent = animal.peso || 'Não informado';
    document.getElementById('animal-saude').textContent = animal.saude || 'Não informado';
    document.getElementById('animal-necessidades').textContent = animal.necessidades_especiais || 'Não informado';

    // Carrossel
    const fotos = (animal.animal_photos && animal.animal_photos.length > 0)
      ? animal.animal_photos.map(f => f.url)
      : ['/img/default.jpg'];

    let currentImageIndex = 0;

    function updateImage() {
      animalImage.src = fotos[currentImageIndex];
    }

    if (prevArrow && nextArrow && animalImage) {
      if (fotos.length <= 1) {
        prevArrow.style.display = "none";
        nextArrow.style.display = "none";
      } else {
        prevArrow.addEventListener("click", () => {
          currentImageIndex = (currentImageIndex - 1 + fotos.length) % fotos.length;
          updateImage();
        });

        nextArrow.addEventListener("click", () => {
          currentImageIndex = (currentImageIndex + 1) % fotos.length;
          updateImage();
        });
      }
      updateImage();
    }

  } catch (err) {
    alert("Erro ao carregar informações do animal.");
  }

  // 
  document.querySelectorAll(".download-button.animal, .download-button.medico").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Funcionalidade a ser implementada no futuro.");
    });
  });
});
