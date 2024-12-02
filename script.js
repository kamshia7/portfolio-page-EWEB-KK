// Selektiere die relevanten Elemente
const submitBtn = document.querySelector(".submitBtn");
const tamilResultLine1 = document.getElementById("tamilResultLine1");
const tamilResultLine2 = document.getElementById("tamilResultLine2");
const englishResult = document.getElementById("englishResult");
const englishMeaning = document.getElementById("englishMeaning");

// API-Key-Platzhalter, wird durch GitHub Actions ersetzt
const apiKey = KURAL_API_KEY;

// Event-Listener für den Button
submitBtn.addEventListener("click", async function fetchKural() {
  const inputNumber = document.getElementById("kuralNumberInput").value; // Eingabewert holen

  // Überprüfen, ob die Eingabe gültig ist
  if (inputNumber < 1 || inputNumber > 1330) {
    alert("Bitte eine Kural-Nummer zwischen 1 und 1330 eingeben.");
    return;
  }

  try {
    // Direkter API-Aufruf für das Kural
    const apiURL = `https://getthirukural.appspot.com/api/3.0/kural/${inputNumber}?appid=${apiKey}&format=json`;

    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Fehler beim Abrufen der Kural-Daten.");

    const data = await response.json();

    // Debugging: Konsolenausgabe der Daten
    console.log("Kural Data:", data);

    // Anzeige der originalen Daten
    tamilResultLine1.textContent = `${data.line1}`;
    tamilResultLine2.textContent = `${data.line2}`;
    englishResult.textContent = data.translation;
    englishMeaning.textContent = data.en;
  } catch (error) {
    console.error("Fehler beim Abrufen der Kural:", error);
    alert("Fehler beim Abrufen der Kural. Bitte versuche es später erneut.");
  }
});
