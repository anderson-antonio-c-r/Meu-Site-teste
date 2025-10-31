// 🔹 Função para inicializar todos os event listeners
function initEventListeners() {
  // Botão de sorteio
  const sortearBtn = document.getElementById("sortearBtn");
  if (sortearBtn) {
    sortearBtn.addEventListener("click", () => {
      const min = parseInt(document.getElementById("min").value);
      const max = parseInt(document.getElementById("max").value);
      if (!isNaN(min) && !isNaN(max) && max >= min) {
        const resultado = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById("resultado").innerText = `Número sorteado: ${resultado}`;
      } else {
        alert("Por favor, insira valores válidos!");
      }
    });
  }

  // Mostrar/ocultar painel do sorteio
  const toggleBtn = document.getElementById("toggleSorteio");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const box = document.getElementById("sorteioBox");
      const isHidden = box.style.display === "none" || box.style.display === "";
      box.style.display = isHidden ? "block" : "none";
      toggleBtn.innerText = isHidden ? "▲ Ocultar Sorteio" : "▼ Mostrar Sorteio";
    });
  }

  // Menu suspenso
  const menuIcon = document.getElementById("menuIcon");
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (menuIcon && dropdownMenu) {
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("menu-visible");
      dropdownMenu.classList.toggle("menu-hidden");
    });

    document.addEventListener("click", (e) => {
      if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add("menu-hidden");
        dropdownMenu.classList.remove("menu-visible");
      }
    });
  }

  // Menu flutuante
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.menu');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

  // Modo redimensionamento
  const resizeToggle = document.getElementById("resizeToggle");
  if (resizeToggle) {
    let resizeMode = resizeToggle.dataset.active === "true";
    resizeToggle.addEventListener("click", () => {
      resizeMode = !resizeMode;
      resizeToggle.dataset.active = resizeMode;

      const allElements = document.querySelectorAll("img, div, section, article, p, h1, h2, h3, h4, h5, h6");
      allElements.forEach(el => {
        if (resizeMode) {
          el.classList.add("resizable");
        } else {
          el.classList.remove("resizable");
        }
      });

      resizeToggle.textContent = resizeMode
        ? "❌ Desativar Redimensionamento"
        : "🖱️ Ativar Redimensionamento";

      alert(
        resizeMode
          ? "🔧 Modo de redimensionamento ativado! Agora você pode redimensionar imagens e layouts arrastando os cantos."
          : "✅ Modo de redimensionamento desativado."
      );
    });

    // Reaplicar redimensionamento se estava ativo
    if (resizeMode) resizeToggle.click();
  }
}

// 🔹 Função para ativar o modo editor
function initEditor(originalContent) {
  let editMode = false;
  let dragElement = null;

  function dragStart(e) {
    dragElement = e.target;
    e.dataTransfer.setData("text/plain", "");
  }

  function dragOver(e) { e.preventDefault(); }

  function drop(e) {
    e.preventDefault();
    if (dragElement && e.target !== dragElement) {
      e.target.parentNode.insertBefore(dragElement, e.target);
    }
    dragElement = null;
  }

  // Inserir controles do editor
  const editorControls = `
    <div class="editor-controls">
      <button id="editToggle">✏️ Modo Editor</button>
      <button id="saveSite">💾 Salvar</button>
      <button id="restoreDefault">♻️ Restaurar padrão</button>
      <button id="downloadHTML">⬇️ Baixar HTML</button>
    </div>
  `;
  if (!document.getElementById("editToggle")) {
    document.body.insertAdjacentHTML("beforeend", editorControls);
  }

  // Toggle editor
  document.getElementById("editToggle").addEventListener("click", () => {
    editMode = !editMode;
    document.body.contentEditable = editMode;

    const elements = document.querySelectorAll("*");
    elements.forEach(el => {
      el.draggable = editMode;
      el.style.outline = editMode ? "1px dashed #555" : "";
      if (editMode) {
        el.addEventListener("dragstart", dragStart);
        el.addEventListener("dragover", dragOver);
        el.addEventListener("drop", drop);
      } else {
        el.removeEventListener("dragstart", dragStart);
        el.removeEventListener("dragover", dragOver);
        el.removeEventListener("drop", drop);
      }
    });

    alert(editMode
      ? "✅ Modo editor ativado! Clique e edite textos, arraste e redimensione elementos."
      : "❌ Modo editor desativado!");
  });

  // Salvar localmente
  document.getElementById("saveSite").addEventListener("click", () => {
    localStorage.setItem("siteContent", document.body.innerHTML);
    alert("💾 Site salvo com sucesso!");
  });

  // Restaurar padrão
  document.getElementById("restoreDefault").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja restaurar o site original?")) {
      localStorage.removeItem("siteContent");
      document.body.innerHTML = originalContent;
      initEventListeners(); // reaplica listeners
      initEditor(originalContent); // reaplica editor
      alert("♻️ Site restaurado!");
    }
  });

  // Baixar HTML
  document.getElementById("downloadHTML").addEventListener("click", () => {
    const content = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    const blob = new Blob([content], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "index.html";
    a.click();
    alert("⬇️ Site baixado como index.html!");
  });
}

// 🔹 Função principal
document.addEventListener("DOMContentLoaded", () => {
  const originalContent = document.body.innerHTML;

  // Carregar conteúdo salvo
  if (localStorage.getItem("siteContent")) {
    document.body.innerHTML = localStorage.getItem("siteContent");
  }

  initEventListeners();   // Aplica listeners do sorteio, menu e redimensionamento
  initEditor(originalContent); // Inicializa editor

  // Salvar sempre antes de sair
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("siteContent", document.body.innerHTML);
  });
});
