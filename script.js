// Selektiere die relevanten Elemente
const submitBtn = document.querySelector(".submitBtn");
const tamilResult = document.getElementById("tamilResult");
const englishResult = document.getElementById("englishResult");

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
