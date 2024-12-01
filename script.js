// Selektiere die relevanten Elemente
const submitBtn = document.querySelector(".submitBtn");
const tamilResult = document.getElementById("tamilResult");
const englishResult = document.getElementById("englishResult");
const englishMeaning = document.getElementById("englishMeaning");

// Event-Listener für den Button
submitBtn.addEventListener("click", async () => {
  const inputNumber = document.getElementById("kuralNumberInput").value;

  // Überprüfen, ob die Eingabe gültig ist
  if (inputNumber < 1 || inputNumber > 1330) {
    alert("Please enter a number between 1 and 1330.");
    return;
  }

  try {
    // API-Aufruf
    const response = await fetch(
      `http://localhost:3000/api/kural/${inputNumber}`
    );
    if (!response.ok) throw new Error("Failed to fetch data from the API.");

    const data = await response.json();

    // Debugging: Konsolenausgabe der Daten
    console.log(data);

    // Ergebnisse anzeigen
    tamilResult.textContent = `${data.line1} ${data.line2}`;
    englishResult.textContent = data.translation;
  } catch (error) {
    console.error("Error fetching Kural:", error);
    alert("Error fetching the Kural. Please try again later.");
  }
});

const btn = document.querySelector(".submitBtn");
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  const inputNumber = document.querySelector("#kuralNumberInput");
  const number = parseInt(inputNumber.value);

  if (number >= 1 && number <= 1000) {
    try {
      // Hole die Kural-Daten vom Backend
      const response = await fetch(`http://localhost:3000/api/kural/${number}`);
      const data = await response.json();

      // Anzeige der originalen Daten
      document.querySelector(
        "#tamilResult"
      ).textContent = `${data.line1} ${data.line2}`;
      document.querySelector("#englishResult").textContent = data.translation;

      // Verbesserung des englischen Textes mit LibreTranslate API
      const improvedText = await improveText(data.en);

      // Übersetzung der englischen Bedeutung ins Deutsche
      const translatedImprovedText = await translateToGerman(improvedText);
      const translatedPoem = await translateToGerman(data.translation);

      // Anzeige der übersetzten Texte
      document.querySelector(
        "#improvedText"
      ).textContent = `Meaning (Improved English): ${improvedText}`;
      document.querySelector(
        "#translatedPoem"
      ).textContent = `German (Poem): ${translatedPoem}`;
      document.querySelector(
        "#translatedImprovedText"
      ).textContent = `German (Meaning): ${translatedImprovedText}`;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    alert("Bitte geben Sie eine gültige Kural-Nummer zwischen 1 und 1000 ein.");
  }
});

// Funktion, um den englischen Text zu verbessern (Verwendung von LibreTranslate API)
async function improveText(text) {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "en",
      format: "text",
    }),
  });
  const data = await response.json();
  return data.translatedText; // Der verbesserte Text
}

// Funktion, um den Text ins Deutsche zu übersetzen (Verwendung von LibreTranslate API)
async function translateToGerman(text) {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "de",
      format: "text",
    }),
  });
  const data = await response.json();
  return data.translatedText; // Der übersetzte Text ins Deutsche
}
