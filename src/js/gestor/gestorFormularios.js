document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#formTable tbody");
  const filterAnimal = document.getElementById("filterAnimal");
  const filterOutros = document.getElementById("filterOutros");

  let forms = [];

  async function carregarFormularios() {
    try {
      const res = await fetch("http://localhost:3000/adocoes");
      forms = await res.json();
      renderizarTabela(forms);
    } catch (err) {
      console.error("Erro ao carregar formulários:", err);
      tableBody.innerHTML = `<tr><td colspan="8">Erro ao carregar os formulários.</td></tr>`;
    }
  }

  function renderizarTabela(lista) {
    tableBody.innerHTML = "";

    if (lista.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8">Nenhum formulário encontrado.</td></tr>`;
      return;
    }

    lista.forEach((form) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${form.nome_completo || "-"}</td>
        <td>${form.cpf || "-"}</td>
        <td>${form.email || "-"}</td>
        <td>${form.telefone || "-"}</td>
        <td>${form.animal_interesse || "-"}</td>
        <td>${form.tem_outros_animais ? "Sim" : "Não"}</td>
        <td>${form.created_at ? new Date(form.created_at).toLocaleDateString("pt-BR") : "-"}</td>
        <td><button class="deleteBtn" data-id="${form.id}">Excluir</button></td>
      `;
      tableBody.appendChild(tr);
    });

    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (confirm("Tem certeza que deseja excluir este formulário?")) {
          try {
            const res = await fetch(`http://localhost:3000/adocoes/${id}`, {
              method: "DELETE",
            });
            if (res.ok) {
              forms = forms.filter(f => f.id != id); 
              renderizarTabela(forms); // re-renderiza tabela
            } else {
              const data = await res.json();
              alert("Erro ao excluir: " + data.message);
            }
          } catch (err) {
            console.error("Erro ao excluir formulário:", err);
            alert("Erro ao excluir formulário.");
          }
        }
      });
    });
  }

  function aplicarFiltros() {
    let filtrados = [...forms];

    const outrosValue = filterOutros.value;

    if (outrosValue) {
      filtrados = filtrados.filter(f =>
        (outrosValue === "sim" && f.tem_outros_animais) ||
        (outrosValue === "nao" && !f.tem_outros_animais)
      );
    }

    renderizarTabela(filtrados);
  }

  filterOutros.addEventListener("change", aplicarFiltros);

  await carregarFormularios();
});

btnVoltar = document.getElementById("btnVoltar");

btnVoltar.addEventListener("click", () => {
    window.location.href = "./gestor.html";
});