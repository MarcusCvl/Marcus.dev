const menuCheckbox = document.getElementById("menu");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation"); // ← usar esse em vez de navbar+menuToggle separados

function fecharMenu() {
  menuCheckbox.checked = false;
  menuToggle.setAttribute("aria-expanded", "false");
}

menuCheckbox.addEventListener("change", () => {
  menuToggle.setAttribute("aria-expanded", menuCheckbox.checked);
});

document.addEventListener("click", (event) => {
  const cliqueForaDoMenu = !navigation.contains(event.target);
  if (menuCheckbox.checked && cliqueForaDoMenu) {
    fecharMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuCheckbox.checked) {
    fecharMenu();
  }
});