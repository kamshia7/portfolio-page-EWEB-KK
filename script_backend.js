require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch"); // API-Abfrage

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware, um statische Dateien (HTML, JS, CSS) bereitzustellen
app.use(express.static("public"));

// API-Abfrage
app.get("/api/kural/:number", async (req, res) => {
  const number = req.params.number; // Kural-Nummer aus URL
  const apiKey = process.env.KURAL_API_KEY; // GitHub Secret aus .env

  try {
    const response = await fetch(
      `https://getthirukural.appspot.com/api/3.0/kural/${number}?appid=${apiKey}&format=json`
    );

    if (!response.ok) {
      throw new Error("Fehler bei der API-Abfrage");
    }

    const data = await response.json();
    res.json(data); // API-Daten als JSON zurückgeben
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Interner Fehler beim Abrufen der Kural-Daten" });
  }
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
