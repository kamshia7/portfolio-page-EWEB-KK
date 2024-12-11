document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio-Webpage is loaded!");

  // Button und Eingabefeld referenzieren
  const submitBtn = document.getElementById("submit-btn");
  const inputNumber = document.getElementById("kuralNumberInput");
  const tamilResultLine1 = document.getElementById("tamil-line1");
  const tamilResultLine2 = document.getElementById("tamil-line2");
  const englishResult = document.getElementById("english-translation");
  const englishMeaning = document.getElementById("english-meaning");

  // Event-Listener für den Button
  submitBtn.addEventListener("click", async () => {
    const kuralNumber = inputNumber.value; // Eingabewert holen

    // Überprüfen, ob die Eingabe gültig ist
    if (kuralNumber < 1 || kuralNumber > 1330) {
      alert("Give a Kural-Number between 1 and 1330.");
      return;
    }

    try {
      // API-Aufruf mit der Eingabenummer
      const response = await fetch(
        `https://getthirukural.appspot.com/api/3.0/kural/${kuralNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${KURAL_API_KEY}`, // API-Key aus Secret
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response data:", data);

      // Ergebnisse in die entsprechenden Felder einfügen
      tamilResultLine1.textContent = data.line1 || "No data for line 1";
      tamilResultLine2.textContent = data.line2 || "No data for line 2";
      englishResult.textContent =
        data.translation || "No translation available";
      englishMeaning.textContent =
        data.explanation || "No explanation available";
    } catch (error) {
      console.error("Fehler beim Abrufen des Thirukkural:", error);
      alert("There was an error fetching the Kural. Please try again.");
    }
  });
});
