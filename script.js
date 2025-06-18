function converter() {
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipoConversao').value;
  let resultado = 0;

  if (isNaN(valor)) {
    document.getElementById('resultado').innerText = "Digite um valor válido.";
    return;
  }

  if (tipo === "kgToLb") {
    resultado = valor * 2.20462;
    document.getElementById('resultado').innerText = `${valor} kg = ${resultado.toFixed(2)} lb`;
  } else {
    resultado = valor * 0.453592;
    document.getElementById('resultado').innerText = `${valor} lb = ${resultado.toFixed(2)} kg`;
  }
}

function registrarPR() {
  const nome = document.getElementById("exercicio").value.trim();
  const carga = parseFloat(document.getElementById("carga").value);
  const unidade = document.getElementById("unidade").value;
  const tipo = document.getElementById("tipo").value;

  if (!nome || isNaN(carga)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const registro = {
    nome,
    carga,
    unidade,
    tipo,
    data: new Date().toLocaleString()
  };

  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.unshift(registro);
  localStorage.setItem("registros", JSON.stringify(registros));

  atualizarListaRegistros();
  alert("PR registrado com sucesso!");
}

function atualizarListaRegistros() {
  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  const lista = document.getElementById("listaRegistros");
  lista.innerHTML = "";

  registros.forEach((r) => {
    const item = document.createElement("li");
    item.textContent = `${r.nome}: ${r.carga} ${r.unidade} | ${r.tipo}`;
    lista.appendChild(item);
  });
}

function exibirRegistros() {
  const lista = document.getElementById("listaRegistros");
  lista.innerHTML = "";

  const registros = JSON.parse(localStorage.getItem("registros")) || [];

  registros.slice(-3).reverse().forEach(reg => {
    const item = document.createElement("li");
    item.innerText = `${reg.nome}: ${reg.carga} ${reg.unidade}`;
    lista.appendChild(item);
  });
}

async function exportarRegistrosPDF() {
  const { jsPDF } = window.jspdf;
  const registros = JSON.parse(localStorage.getItem("registros")) || [];

  if (registros.length === 0) {
    alert("Nenhum registro encontrado para exportar.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Registros de Carga Máxima - Meu PR", 10, 15);

  let y = 25;
  registros.forEach((reg, i) => {
    doc.text(`${i + 1}. ${reg.nome} | ${reg.carga} ${reg.unidade} | ${reg.tipo} | ${reg.data || ''}`, 10, y);
    y += 10;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("meus-prs.pdf");
}

window.onload = exibirRegistros;
