// Vitrine: sem script, as cinco telas aparecem uma embaixo da outra; com script, viram abas.
(function () {
  const vitrine = document.getElementById("vitrine");
  if (!vitrine) return;
  const abas = Array.from(vitrine.querySelectorAll('[role="tab"]'));
  const paineis = abas.map(a => document.getElementById(a.getAttribute("aria-controls")));
  function mostrar(i, focar) {
    abas.forEach((a, j) => {
      const ativa = i === j;
      a.setAttribute("aria-selected", ativa ? "true" : "false");
      a.tabIndex = ativa ? 0 : -1;
      paineis[j].hidden = !ativa;
    });
    if (focar) abas[i].focus();
  }
  function trazer(i) {
    // no celular a barra de abas rola para o lado: deixa a aba escolhida à vista, sem mexer na página
    const barra = abas[i].parentElement, a = abas[i];
    const alvo = a.offsetLeft - (barra.clientWidth - a.offsetWidth) / 2;
    barra.scrollTo({ left: Math.max(0, alvo), behavior: "smooth" });
  }
  abas.forEach((a, i) => {
    a.addEventListener("click", () => { mostrar(i, false); trazer(i); });
    a.addEventListener("focus", () => trazer(i));
    a.addEventListener("keydown", e => {
      const n = abas.length;
      if (e.key === "ArrowRight") { e.preventDefault(); mostrar((i + 1) % n, true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); mostrar((i - 1 + n) % n, true); }
      if (e.key === "Home") { e.preventDefault(); mostrar(0, true); }
      if (e.key === "End") { e.preventDefault(); mostrar(n - 1, true); }
    });
  });
  vitrine.classList.add("ativa");
  mostrar(0, false);
})();

// Copiar e-mail
(function () {
  const botao = document.getElementById("copiar");
  const alvo = document.getElementById("email");
  if (!botao || !alvo) return;
  botao.addEventListener("click", () => {
    const marcar = () => {
      const r = document.createRange(); r.selectNodeContents(alvo);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      botao.textContent = "Selecionado: copie com o teclado";
    };
    try {
      navigator.clipboard.writeText(alvo.textContent).then(() => { botao.textContent = "E-mail copiado"; }, marcar);
    } catch (e) { marcar(); }
  });
})();
