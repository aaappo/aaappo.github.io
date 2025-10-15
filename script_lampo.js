let CtoF = true; // true = C → F, false = F → C

const leftInput = document.getElementById("leftInput");
const rightInput = document.getElementById("rightInput");
const labelLeft = document.getElementById("labelLeft");
const labelRight = document.getElementById("labelRight");
const unitLeft = document.getElementById("unitLeft");
const unitRight = document.getElementById("unitRight");
const errorDiv = document.getElementById("errorMessage");
const decimalSelect = document.getElementById("decimalSelect");

document.getElementById("swapBtn").addEventListener("click", swapDirection);
leftInput.addEventListener("input", convertTemperature);
decimalSelect.addEventListener("change", convertTemperature); 

function showError(msg) {
  errorDiv.textContent = msg;
}

function clearError() {
  errorDiv.textContent = "";
}
// muunnos
function swapDirection() {
  CtoF = !CtoF;

  if (CtoF) {
    labelLeft.textContent = "Celsius";
    labelRight.textContent = "Fahrenheit";
    unitLeft.textContent = "°C";
    unitRight.textContent = "°F";
  } else {
    labelLeft.textContent = "Fahrenheit";
    labelRight.textContent = "Celsius";
    unitLeft.textContent = "°F";
    unitRight.textContent = "°C";
  }

  leftInput.value = "";
  rightInput.value = "";
  clearError();
}

function convertTemperature() {
  const value = leftInput.value.trim();
  clearError();

  if (value === "") {
    rightInput.value = "";
    return;
  }

  const temp = parseFloat(value);
  if (isNaN(temp)) {
    showError("Anna kelvollinen lukuarvo!");
    rightInput.value = "";
    return;
  }
// nollapiste
  if (CtoF && temp < -273.15) {
    showError("Celsius ei voi olla pienempi kuin -273,15 °C!");
    return;
  }

  if (!CtoF && temp < -459.67) {
    showError("Fahrenheit ei voi olla pienempi kuin -459,67 °F!");
    return;
  }

  let converted;
  if (CtoF) {
    converted = (temp * 9/5) + 32;
  } else {
    converted = (temp - 32) * 5/9;
  }

  // desimaalitarkkuus valinnan mukaan
  const decimals = parseInt(decimalSelect.value);
  rightInput.value = converted.toFixed(decimals);
}