document.addEventListener("DOMContentLoaded", () => {
  async function fetchRandomKural() {
    const randomNumber = Math.floor(Math.random() * 1330) + 1; // Zufällige Kural-Nummer (1-1330)

    const url = `https://getthirukkural.appspot.com/api/3.0/kural/${randomNumber}?appid=${KURAL_API_KEY}&format=json`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${KURAL_API_KEY}`, // Falls der API-Aufruf eine Authentifizierung erfordert
        },
      });

      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Kural-Daten");
      }

      const data = await response.json();

      // Kural-Daten auf der Seite anzeigen
      document.getElementById("kuralNumber").innerText = data.number;
      document.getElementById("kuralTamil_1").innerText = `${data.line1}`;
      document.getElementById("kuralTamil_2").innerText = `${data.line2}`;
      document.getElementById("kuralTranslation").innerText = data.translation;
      document.getElementById("kuralMeaning").innerText = data.en;
    } catch (error) {
      console.error("Fehler beim Abrufen der Kural-Daten:", error);
      alert("Es gab einen Fehler beim Abrufen der Kural-Daten.");
    }
  }

  // Thirukkural beim Laden der Seite anzeigen
  fetchRandomKural();

  // Button zum erneuten Laden eines Thirukkurals
  document
    .getElementById("fetch-kural-btn")
    .addEventListener("click", fetchRandomKural);
});
