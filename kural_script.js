// Funktion, um das Thirukkural basierend auf der eingegebenen Nummer zu laden
async function fetchThirukkural() {
  const kuralNumber = document.getElementById("kuralNumberInput").value;

  if (!kuralNumber || kuralNumber < 1 || kuralNumber > 1330) {
    alert("Bitte gib eine Nummer zwischen 1 und 1330 ein.");
    return;
  }

  // API-URL mit App ID und Parameter für JSON-Antwort
  const apiKey = process.env.KURAL_API_KEY;
  const apiUrl = `https://getthirukkural.appspot.com/api/3.0/kural/${kuralNumber}?appid=${apiKey}&format=json`;

  try {
    // Anfrage an die API senden
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Daten.");
    }

    // Antwort als JSON umwandeln
    const kuralData = await response.json();

    // Ergebnisse anzeigen
    document.getElementById("tamil-line1").innerText =
      kuralData.kural.line1 || "N/A";
    document.getElementById("tamil-line2").innerText =
      kuralData.kural.line2 || "N/A";
    document.getElementById("english-translation").innerText =
      kuralData.kural.eng || "N/A";
    document.getElementById("english-meaning").innerText =
      kuralData.kural.eng_exp || "N/A";
  } catch (error) {
    console.error("Fehler:", error);
    alert("Etwas ist schief gelaufen. Bitte versuche es später erneut.");
  }
}

// Event-Listener: Führt die Funktion aus, wenn der Button geklickt wird
document
  .querySelector(".submitBtn")
  .addEventListener("click", fetchThirukkural);
