document
  .getElementById("fetchKuralButton")
  .addEventListener("click", async () => {
    const numberInput = document.getElementById("kuralNumberInput");
    const tamilResult = document.getElementById("tamilResult");
    const englishResult = document.getElementById("englishResult");

    // Hol dir die eingegebene Kural-Nummer
    const number = numberInput.value.trim();

    if (!number) {
      tamilResult.textContent = "Bitte gib eine gültige Kural-Nummer ein.";
      englishResult.textContent = "";
      return;
    }

    try {
      // Backend-API aufrufen
      const response = await fetch(`http://localhost:3000/api/kural/${number}`);

      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der API-Daten.");
      }

      const data = await response.json();

      // Zeige die Ergebnisse auf der Webseite an
      tamilResult.textContent = `${data.line1} ${data.line2}`; // Tamilischer Text
      englishResult.textContent = data.translation; // Englische Übersetzung
    } catch (error) {
      console.error("Error fetching Kural:", error);
      tamilResult.textContent = "Fehler beim Abrufen der Kural-Daten.";
      englishResult.textContent =
        "Bitte überprüfe die API und versuche es erneut.";
    }
  });
