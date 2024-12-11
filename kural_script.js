document
  .getElementById("getKuralButton")
  .addEventListener("click", fetchRandomKural);

async function fetchRandomKural() {
  const apiKey = process.env.KURAL_API_KEY; // Setze den API-Schlüssel als Umgebungsvariable
  const url =
    "https://getthirukkural.appspot.com/kural?number=" +
    Math.floor(Math.random() * 1330) +
    1; // Zufällige Kural-Nummer von 1 bis 1330

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Kural-Daten");
    }

    const data = await response.json();

    // Kural-Daten auf der Seite anzeigen
    document.getElementById("kuralNumber").innerText = data.number;
    document.getElementById(
      "kuralTamil"
    ).innerText = `${data.line1} - ${data.line2}`;
    document.getElementById("kuralTranslation").innerText = data.translation;
    document.getElementById("kuralMeaning").innerText =
      data.urai1 + " | " + data.urai2 + " | " + data.urai3;
  } catch (error) {
    console.error("Fehler beim Abrufen des Thirukkural:", error);
    alert("Es gab einen Fehler beim Abrufen des Thirukkural.");
  }
}
