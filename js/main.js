"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Mariam Aljizawi
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
  // Töm gamla fel så att de inte ackumuleras mellan försök
  errors = [];

  // Kontrollera att varje obligatoriskt fält innehåller ett värde
  // trim() gör att fält med bara mellanslag också räknas som tomma
  if (fullnameInput.value.trim() === "") {
    errors.push("Du måste ange ett namn.");
  }
  if (emailInput.value.trim() === "") {
    errors.push("Du måste ange en e-postadress.");
  }
  if (phoneInput.value.trim() === "") {
    errors.push("Du måste ange ett telefonnummer.");
  }

  // Visa felmeddelanden
  displayErrors();

  // Returnera true om inga fel hittas, annars false
  return errors.length === 0;
}
function displayErrors() {
  // Rensa tidigare felmeddelanden
  // Rensa tidigare felmeddelanden
  errorList.innerHTML = "";

  // Skapa ett listelement (li) för varje felmeddelande i arrayen
  for (const message of errors) {
    const listItem = document.createElement("li");
    listItem.textContent = message;
    errorList.appendChild(listItem);
  }
}

/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
  // Hämta information från formuläret
  const fullname = fullnameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const font = fontSelect.value;

  // Uppdatera studentkortet med texten från formuläret
  previewFullname.textContent = fullname;
  previewEmail.textContent = email;
  previewPhone.textContent = phone;

  // Använd det valda typsnittet på informationen
  previewFullname.style.fontFamily = font;
  previewEmail.style.fontFamily = font;
  previewPhone.style.fontFamily = font;

  // Historik

  // Skapa ett objekt som representerar studentkortet
  const student = {
    name: fullname,
    email: email,
    phone: phone,
    font: font,
  };

  // Lägg till kortet först i historiken så att det senaste visas överst
  history.unshift(student);
  // Spara historiken i localStorage
  saveHistory();
  // Uppdatera historiken på sidan direkt
  renderHistory();
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
  // Spara history i localStorage
  // localStorage lagrar bara text, så arrayen görs om till JSON-text
  localStorage.setItem("history", JSON.stringify(history));
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
  // Hämta eventuell sparad historik (null om inget finns sparat)
  const savedHistory = localStorage.getItem("history");

  // Gör om JSON-texten till en array igen och uppdatera history
  if (savedHistory !== null) {
    history = JSON.parse(savedHistory);
  }
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
  // Rensa tidigare visad historik
  historySection.innerHTML = "";

  // Skapa ett element för varje studentkort i historiken
  for (const student of history) {
    const entry = document.createElement("div");
    entry.className = "card-info";

    // Använd typsnittet som sparades med kortet
    entry.style.fontFamily = student.font;

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Namn: " + student.name;

    const emailParagraph = document.createElement("p");
    emailParagraph.textContent = "E-post: " + student.email;

    const phoneParagraph = document.createElement("p");
    phoneParagraph.textContent = "Telefon: " + student.phone;

    // Lägg ihop elementen och lägg till i DOM
    entry.append(nameParagraph, emailParagraph, phoneParagraph);
    historySection.appendChild(entry);
  }
}

/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
  // Återställ formulärets fält
  form.reset();

  // Återställ studentkortet till standardtexterna
  previewFullname.textContent = "Namn";
  previewEmail.textContent = "E-post";
  previewPhone.textContent = "Telefon";
  previewFullname.style.fontFamily = "";
  previewEmail.style.fontFamily = "";
  previewPhone.style.fontFamily = "";

  // Rensa eventuella felmeddelanden
  errors = [];
  displayErrors();
}

/**
 * Raderar hela historiken.
 */
function deleteHistory() {
  // Radera sparad historik från localStorage
  localStorage.removeItem("history");

  // Töm arrayen och uppdatera visningen på sidan
  history = [];
  renderHistory();
}
/**
 * Tar bort alla tecken som inte är siffror från telefonfältet.
 */
function filterPhoneInput() {
  // \D matchar allt som inte är en siffra, och g tar med alla förekomster
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
}

// Eventlyssnare

// När formuläret skickas:
form.addEventListener("submit", function (event) {
  // Stoppa webbläsarens standardbeteende (omladdning av sidan)
  event.preventDefault();

  // Skapa bara ett studentkort om valideringen lyckades
  if (validateForm()) {
    createStudentCard();
  }
});
// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm);
// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory);

// När sidan laddas:
window.addEventListener("DOMContentLoaded", function () {
  loadHistory();
  renderHistory();
});
// När användaren skriver i telefonfältet:
// ta bort allt som inte är siffror
phoneInput.addEventListener("input", filterPhoneInput);
