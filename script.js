// Selektiere die relevanten Elemente
const submitBtn = document.querySelector(".submitBtn");
const tamilResult = document.getElementById("tamilResult");
const englishResult = document.getElementById("englishResult");
const improvedTextField = document.getElementById("improvedText");
const translatedPoemField = document.getElementById("translatedPoem");
const translatedImprovedTextField = document.getElementById(
  "translatedImprovedText"
);

// Event-Listener für den Button
submitBtn.addEventListener("click", async () => {
  const inputNumber = document.getElementById("kuralNumberInput").value;

  // Überprüfen, ob die Eingabe gültig ist
  if (inputNumber < 1 || inputNumber > 1330) {
    alert("Please enter a number between 1 and 1330.");
    return;
  }

  try {
    // API-Aufruf für das Kural
    const response = await fetch(
      `http://localhost:3000/api/kural/${inputNumber}`
    );
    if (!response.ok) throw new Error("Failed to fetch data from the API.");

    const data = await response.json();

    // Debugging: Konsolenausgabe der Daten
    console.log("Kural Data:", data);

    // Anzeige der originalen Daten
    tamilResult.textContent = `${data.line1} ${data.line2}`;
    englishResult.textContent = data.translation;

    // Verbesserung des englischen Textes mit LibreTranslate API
    const improvedText = await improveText(data.en);
    console.log("Improved English Text:", improvedText);

    // Übersetzung der englischen Bedeutung ins Deutsche
    const translatedImprovedText = await translateToGerman(improvedText);
    console.log("Translated Improved Text (German):", translatedImprovedText);

    const translatedPoem = await translateToGerman(data.translation);
    console.log("Translated Poem (German):", translatedPoem);

    // Anzeige der übersetzten Texte
    improvedTextField.textContent = `${improvedText}`;
    translatedPoemField.textContent = `${translatedPoem}`;
    translatedImprovedTextField.textContent = `${translatedImprovedText}`;
  } catch (error) {
    console.error("Error fetching Kural:", error);
    alert("Error fetching the Kural. Please try again later.");
  }
});

// Funktion, um den englischen Text zu verbessern (Verwendung von LibreTranslate API)
async function improveText(text) {
  try {
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

    if (!response.ok)
      throw new Error("Failed to improve text with LibreTranslate API.");

    const data = await response.json();
    return data.translatedText; // Der verbesserte Text
  } catch (error) {
    console.error("Error improving text:", error);
    return text; // Falls ein Fehler auftritt, gebe den Originaltext zurück
  }
}

// Funktion, um den Text ins Deutsche zu übersetzen (Verwendung von LibreTranslate API)
async function translateToGerman(text) {
  try {
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

    if (!response.ok) throw new Error("Failed to translate text to German.");

    const data = await response.json();
    return data.translatedText; // Der übersetzte Text ins Deutsche
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // Falls ein Fehler auftritt, gebe den Originaltext zurück
  }
}
