// Aguarda o DOM carregar para garantir que todos os elementos existam
document.addEventListener("DOMContentLoaded", function() {
  //links pelo ID
  const btnHome    = document.getElementById("link-home");
  const btnContato = document.getElementById("link-contato");
  const btnSobre   = document.getElementById("link-sobre");

  // 1) Topo da página
  const topoPagina    = document.getElementById("topo");
  // 2) Seção "Sobre Nós"
  const secSobre      = document.querySelector("footer .sobre-nos");
  // 3) Seção "Contato"
  const secContato    = document.querySelector("footer .social");

  //rolar até um elemento de forma suave
  function scrollParaElemento(elemento) {
    elemento.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Botão HOME: rola até o topo da página (nav)
  btnHome.addEventListener("click", function(event) {
    event.preventDefault();
    scrollParaElemento(topoPagina);
  });

  // Botão CONTATO: rola até a área de redes sociais no footer
  btnContato.addEventListener("click", function(event) {
    event.preventDefault();
    scrollParaElemento(secContato);
  });

  // Botão SOBRE NÓS: rola até a seção de “Sobre Nós” no footer
  btnSobre.addEventListener("click", function(event) {
    event.preventDefault();
    scrollParaElemento(secSobre);
  });
});

// carrinho de compras

document.addEventListener("DOMContentLoaded", function() {
  const btnCarrinho = document.getElementById("carrinho");
  const cartSidebar = document.getElementById("cart-sidebar");
  const btnFechar   = document.getElementById("fechar-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  // Armazena produtos no formato:
  // { "Nome": { preco: number, quantidade: number, imgSrc: string } }
  const carrinho = {};

  // Abre/fecha o carrinho
  function toggleCart() {
    cartSidebar.classList.toggle("open");
  }
  btnCarrinho.addEventListener("click", toggleCart);
  btnFechar.addEventListener("click", toggleCart);

  // Adiciona carrinho ao clicar em .btn-add
  document.querySelectorAll(".btn-add").forEach(function(botao) {
    botao.addEventListener("click", function() {
      const produtoEl = botao.closest(".produto");
      const nome = produtoEl.querySelector("h2").textContent;

      let precoText = produtoEl.querySelector("p").textContent;
      precoText = precoText.replace("R$", "").replace(" ", "").replace(",", ".");
      const preco = parseFloat(precoText);

      const imgSrc = produtoEl.querySelector("img").src;

      if (carrinho[nome]) {
        carrinho[nome].quantidade += 1;
      } else {
        carrinho[nome] = {
          preco: preco,
          quantidade: 1,
          imgSrc: imgSrc
        };
      }

      renderizarCarrinho();
      cartSidebar.classList.add("open");
    });
  });

  // Atualiza lista de itens e total
  function renderizarCarrinho() {
    cartItemsContainer.innerHTML = "";
    let totalGeral = 0;

    Object.keys(carrinho).forEach(function(nome) {
      const { preco, quantidade, imgSrc } = carrinho[nome];
      const subtotal = preco * quantidade;
      totalGeral += subtotal;

      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");

      // Imagem do produto
      const imgEl = document.createElement("img");
      imgEl.src = imgSrc;
      imgEl.alt = nome;

      // Informações do produto
      const infoEl = document.createElement("div");
      infoEl.classList.add("info");
      infoEl.innerHTML = `
        <span class="item-nome">${nome}</span>
        <div class="quantity-controls">
          <button class="btn-decrease">−</button>
          <span class="item-quantidade">${quantidade}</span>
          <button class="btn-increase">+</button>
        </div>
        <span class="item-preco">Subtotal: R$ ${subtotal.toFixed(2)}</span>
      `;

      // Botão Remover (remove imediatamente)
      const btnRemove = document.createElement("button");
      btnRemove.classList.add("remove-item");
      btnRemove.textContent = "Remover";
      btnRemove.addEventListener("click", function() {
        delete carrinho[nome];
        renderizarCarrinho();
      });

      itemEl.appendChild(imgEl);
      itemEl.appendChild(infoEl);
      itemEl.appendChild(btnRemove);
      cartItemsContainer.appendChild(itemEl);

      // aumentar/diminuir
      const btnInc = infoEl.querySelector(".btn-increase");
      const btnDec = infoEl.querySelector(".btn-decrease");

      btnInc.addEventListener("click", function() {
        carrinho[nome].quantidade += 1;
        renderizarCarrinho();
      });

      btnDec.addEventListener("click", function() {
        carrinho[nome].quantidade -= 1;
        if (carrinho[nome].quantidade <= 0) {
          delete carrinho[nome];
        }
        renderizarCarrinho();
      });
    });

    cartTotalEl.textContent = totalGeral.toFixed(2);
  }
});
