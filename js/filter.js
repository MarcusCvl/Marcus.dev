const botoesFiltro = document.querySelectorAll(".projects-filters-button");
const projetos = document.querySelectorAll(".projects-cards-item");
const avisoVazio = document.querySelector(".projects-empty");
const botaoVerMais = document.querySelector(".projects-button");

// quantos projetos aparecem antes do "Ver mais"
const LIMITE_PROJETOS = 3;
let filtroAtual = "todos";
let listaExpandida = false;

function filtrarProjetos() {
  let projetosVisiveis = 0;

  projetos.forEach((projeto) => {
    const mostrar =
      filtroAtual === "todos" || projeto.dataset.categoria === filtroAtual;
    projeto.classList.toggle("escondido", !mostrar);

    if (mostrar) {
      projetosVisiveis++;
    }

    // só recolhe o que passou do limite dentro da categoria escolhida
    const passouDoLimite = mostrar && projetosVisiveis > LIMITE_PROJETOS;
    projeto.classList.toggle("recolhido", passouDoLimite && !listaExpandida);
  });

  // categoria sem projeto mostra o aviso no lugar da lista vazia
  avisoVazio.classList.toggle("escondido", projetosVisiveis > 0);

  botaoVerMais.classList.toggle(
    "escondido",
    projetosVisiveis <= LIMITE_PROJETOS
  );
  botaoVerMais.textContent = listaExpandida ? "Ver menos" : "Ver mais";
  botaoVerMais.setAttribute("aria-expanded", listaExpandida);
}

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesFiltro.forEach((item) => {
      item.classList.remove("ativo");
      item.setAttribute("aria-pressed", "false");
    });
    botao.classList.add("ativo");
    botao.setAttribute("aria-pressed", "true");
    filtroAtual = botao.dataset.filtro;
    listaExpandida = false;
    filtrarProjetos();
  });
});

botaoVerMais.addEventListener("click", () => {
  listaExpandida = !listaExpandida;
  filtrarProjetos();
});

filtrarProjetos();
