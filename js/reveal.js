const elementosReveal = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observer.unobserve(entrada.target);

        // o atraso em cascata só serve para a entrada, depois o hover responde na hora
        entrada.target.addEventListener(
          "transitionend",
          () => {
            entrada.target.style.transitionDelay = "0s";
          },
          { once: true }
        );
      }
    });
  },
  { threshold: 0.15 }
);

elementosReveal.forEach((elemento) => observer.observe(elemento));