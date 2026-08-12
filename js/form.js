const form = document.querySelector(".form");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuDMly_gjx9qcP2TX3F2tOyQp_nlAoMuX3Uh3fUyJFlYxZq-j-tM9Jxw6meWTDxpIjeA/exec";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // se o campo invisível foi preenchido, é bot — finge sucesso e não envia nada
  if (form.website.value !== "") {
    form.reset();
    return;
  }

  const botao = form.querySelector(".form-button");
  const textoOriginal = botao.textContent;
  botao.textContent = "Enviando...";
  botao.disabled = true;

  const dados = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    selection: form.selection.value,
    message: form.message.value,
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(dados),
    });

    botao.textContent = "Enviado! ✓";
    form.reset();
  } catch (erro) {
    botao.textContent = "Erro, tenta de novo";
    console.error(erro);
  } finally {
    setTimeout(() => {
      botao.textContent = textoOriginal;
      botao.disabled = false;
    }, 3000);
  }
});