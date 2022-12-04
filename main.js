//Capturando o envento de submit do formuçário
const form = document.querySelector("#formulario");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputPeso = event.target.querySelector("#peso");
  const inputAltura = event.target.querySelector("#altura");

  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  if (!peso) {
    setResultado("Peso inválido!", false);
    return;
  }

  if (!altura) {
    setResultado("Altura inválida!", false);
    return;
  }

  const imc = getImc(peso, altura);
  const parametroImc = getParametroImc(imc);

  const msg = `Seu IMC é ${imc} (${parametroImc})`;

  setResultado(msg, true);
});

function getParametroImc(imc) {
  const parametro = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau 1",
    "Obesidade grau 2",
    "Obesidade grau 3",
  ];

  if (imc >= 39.9) {
    return parametro[5];
  } else if (imc >= 34.9) {
    return parametro[4];
  } else if (imc >= 29.9) {
    return parametro[3];
  } else if (imc >= 24.9) {
    return parametro[2];
  } else if (imc >= 18.5) {
    return parametro[1];
  } else if (imc < 18.5) {
    return parametro[0];
  }
}

function getImc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaP() {
  const p = document.createElement("p");
  return p;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = "";

  const p = criaP();

  if (isValid) {
    p.classList.add("paragrafo-resultado");
  } else {
    p.classList.add("bad");
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}
