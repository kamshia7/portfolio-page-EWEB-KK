// Selektiere die relevanten Elemente
const submitBtn = document.querySelector(".submitBtn");
const tamilResultLine1 = document.getElementById("tamilResultLine1");
const tamilResultLine2 = document.getElementById("tamilResultLine2");
const englishResult = document.getElementById("englishResult");
const englishMeaning = document.getElementById("englishMeaning");

// Event-Listener für den Button
submitBtn.addEventListener("click", async () => {
  const inputNumber = document.getElementById("kuralNumberInput").value;

  // Überprüfen, ob die Eingabe gültig ist
  if (inputNumber < 1 || inputNumber > 1330) {
    alert("Bitte eine Kural-Nummer zwischen 1 und 1330 eingeben.");
    return;
  }

  try {
    // API-Aufruf für das Kural
    const response = await fetch(
      `http://localhost:3000/api/kural/${inputNumber}` //dynamisch machen und nicht localhost
    );
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
