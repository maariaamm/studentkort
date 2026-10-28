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

  // Historik läggs till i ett senare steg
}

/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
  // Spara history i localStorage
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
  // Hämta eventuell sparad historik
  // Uppdatera history
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
  // Rensa tidigare visad historik
  // Skriv ut innehållet i history till DOM
}

/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
  // Återställ formulär och studentkort
  // Rensa eventuella felmeddelanden
}

/**
 * Raderar hela historiken.
 */
function deleteHistory() {
  // Radera sparad historik
  // Uppdatera history och visningen på sidan
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

// När användaren klickar på "Radera historik"

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
