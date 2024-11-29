const apiKey = process.env.KURAL_API_KEY; // Funktioniert nur mit Backend-Umgebungen

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://getthirukural.appspot.com/api/3.0/kural/";
  const fetchButton = document.getElementById("fetch-kural");
  const kuralNumberInput = document.getElementById("kural-number");
  const tamilResult = document.querySelector("#tamil span");
  const englishResult = document.querySelector("#english span");

  // Fetch Kural function
  async function fetchKural() {
    const kuralNumber = kuralNumberInput.value;

    // Validate input
    if (!kuralNumber || kuralNumber < 1 || kuralNumber > 1330) {
      alert("Please enter a valid Kural number (1-1330).");
      return;
    }

    try {
      // Fetch API data
      const response = await fetch(`${apiUrl}${kuralNumber}`);

      if (!response.ok) {
        throw new Error("Failed to fetch the Kural.");
      }

      const data = await response.json();

      // Display results
      tamilResult.textContent = data.line1 + " " + data.line2;
      englishResult.textContent = data.eng;
    } catch (error) {
      console.error("Error fetching Kural:", error);
      tamilResult.textContent = "Error fetching the Kural.";
      englishResult.textContent = "Please try again.";
    }
  }

  // Add event listener to the button
  fetchButton.addEventListener("click", fetchKural);
});
