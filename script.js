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

function exibirRegistros() {
  const lista = document.getElementById("listaRegistros");
  lista.innerHTML = "";

  const registros = JSON.parse(localStorage.getItem("registros")) || [];

  registros.slice(-3).reverse().forEach(reg => {
    const item = document.createElement("li");
    item.innerText = `${reg.exercicio}: ${reg.carga} ${reg.unidade}`;
    lista.appendChild(item);
  });
}

window.onload = exibirRegistros;
