const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // CORS aktivieren
app.use(express.json()); // Um JSON-Daten im Body der Anfrage zu akzeptieren
app.use(express.static("public")); // Statische Dateien bereitstellen

// API-Endpunkt für das Abrufen der Kural-Daten
app.get("/api/kural/:number", async (req, res) => {
  const number = req.params.number; // Kural-Nummer aus URL
  const apiKey = process.env.KURAL_API_KEY;

  try {
    const apiURL = `https://getthirukural.appspot.com/api/3.0/kural/${number}?appid=${apiKey}&format=json`;

    console.log("Fetching API for Kural...");
    console.log("URL:", apiURL);

    const response = await fetch(apiURL); // Verwenden von fetch anstelle von axios
    console.log("API Response Status:", response.status);

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Kural-Daten.");
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    res.json(data); // API-Daten zurückgeben
  } catch (error) {
    console.error("Fehler beim Abrufen der Kural:", error.message);
    res.status(500).json({ error: "Fehler beim Abrufen der Kural-Daten." });
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
