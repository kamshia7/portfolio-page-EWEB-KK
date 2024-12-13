document.addEventListener("DOMContentLoaded", () => {
  // Funktion zum Abrufen des Thirukkurals
  async function fetchRandomKural() {
    const apiKey = KURAL_API_KEY; // Setze den API-Schlüssel als Umgebungsvariable
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
        throw new Error("Error when retrieving the Kural data");
      }

      const data = await response.json();

      // Kural-Daten auf der Seite anzeigen
      document.getElementById("kuralNumber").innerText = data.number;
      document.getElementById(
        "kuralTamil"
      ).innerText = `${data.line1} - ${data.line2}`;
      document.getElementById("kuralTranslation").innerText = data.translation;
      document.getElementById("kuralMeaning").innerText = data.eng;
    } catch (error) {
      console.error("Error when retrieving the Kural data:", error);
      alert("There was an error when retrieving the Kural data.");
    }
  }

  // Thirukkural beim Laden der Seite anzeigen
  fetchRandomKural();

  // Button zum erneuten Laden eines Thirukkurals
  document
    .getElementById("fetch-kural-btn")
    .addEventListener("click", fetchRandomKural);
});
