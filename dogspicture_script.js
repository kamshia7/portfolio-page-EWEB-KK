const { response } = require("express");

async function fetchDogImage() {
  try {
    const response = await fetch("https://random.dog/woof.json");

    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response data:", data); // Ausgabe der Daten zur Überprüfung

    // Nur Bilder anzeigen, keine Videos
    if (
      data.url.endsWith(".jpg") ||
      data.url.endsWith(".jpeg") ||
      data.url.endsWith(".png") ||
      data.url.endsWith(".gif")
    ) {
      document.getElementById("dog-image").src = data.url;
    } else {
      fetchDogImage(); // Falls kein Bild (z.B. Video), nochmals abrufen
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Hundebildes:", error);
    alert("Es gab einen Fehelr beim Laden des Hundebildes.");
  }
}

// Bild beim Laden der Seite anzeigen
fetchDogImage();

// Button zum erneuten Laden eines Bildes
document.getElementById("fetch-btn").addEventListener("click", fetchDogImage);
