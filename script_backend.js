const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public")); // Statische Dateien bereitstellen

app.get("/api/kural/:number", async (req, res) => {
  const number = req.params.number; // Kural-Nummer aus URL
  const apiKey = process.env.KURAL_API_KEY;

  try {
    const apiURL = `https://getthirukural.appspot.com/api/3.0/kural/${number}?appid=${apiKey}&format=json`;

    console.log("Fetching API for Kural...");
    console.log("URL:", apiURL);

    const response = await fetch(apiURL);
    console.log("API Response Status:", response.status);

    if (!response.ok) {
      throw new Error("Failed to fetch API data.");
    }

    const data = await response.json();
    console.log("API Response Data:", data);

    res.json(data); // API-Daten zurückgeben
  } catch (error) {
    console.error("Error fetching API:", error.message);
    res.status(500).json({ error: "Failed to fetch API data." });
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
