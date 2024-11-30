document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetch-kural");
  const kuralNumberInput = document.getElementById("kural-number");
  const tamilResult = document.getElementById("tamil-line");
  const englishResult = document.getElementById("english-translation");

  async function fetchKural() {
    const kuralNumber = kuralNumberInput.value;

    if (!kuralNumber || kuralNumber < 1 || kuralNumber > 1330) {
      alert("Please enter a valid Kural number (1-1330).");
      return;
    }

    try {
      const response = await fetch(`/api/kural/${kuralNumber}`);
      if (!response.ok) throw new Error("Failed to fetch Kural.");

      const data = await response.json();
      tamilResult.textContent = `${data.line1} ${data.line2}`;
      englishResult.textContent = data.translation;
    } catch (error) {
      console.error("Error fetching Kural:", error);
      tamilResult.textContent = "Error fetching the Kural.";
      englishResult.textContent = "Please try again.";
    }
  }

  fetchButton.addEventListener("click", fetchKural);
});
