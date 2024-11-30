let bottomDiv = document.querySelector(".bottomDiv");
let btn = document.querySelector(".submitBtn");
let tamilResult = document.querySelector("#tamilResult");
let englishResult = document.querySelector("#englishResult");

btn.addEventListener("click", (event) => {
  event.preventDefault(); // Verhindert das Standard-Verhalten der Schaltfläche
  bottomDiv.innerHTML = ""; // Leert den Bereich

  let inputNumber = document.querySelector("#kuralNumberInput");
  let value = inputNumber.value.trim(); // Holt den Wert aus dem Eingabefeld

  if (value >= 1 && value <= 1330) {
    const fetchKural = async () => {
      try {
        // Anfrage an dein Backend, um die Kural-Daten zu holen
        let response = await fetch(`http://localhost:3000/api/kural/${value}`);
        if (!response.ok) {
          throw new Error("Error fetching Kural data.");
        }

        // Antwort von der API
        let data = await response.json();
        console.log(data);

        // Setze Tamil- und Englisch-Daten in den vorgesehenen Bereich
        tamilResult.textContent = `${data.line1} ${data.line2}`;
        englishResult.textContent = data.translation;

        // Optional: Display die gesamte Kural an einem anderen Ort (in bottomDiv)
        bottomDiv.innerHTML += `
                    <div class="kuralDisplay">
                        <div class="tamilKural">
                            <div class="tamilTitle">திருக்குறள்: ${data.number}</div>
                            <div class="tamilTitle">${data.paal} - ${data.iyal}</div>
                            <div class="tamilline">
                                <div class="tamilline1">${data.line1}</div>
                                <div class="tamilline2">${data.line2}</div>
                            </div>
                            <div class="tamilMeaningHeading">பொருள்:</div>
                            <div class="tamilMeaning">${data.urai3}</div>
                        </div>
                        <div class="englishKural">
                            <div class="englishTitle">Thirukkural: ${data.number}</div>
                            <div class="englishMeaningHeading">Translation:</div>
                            <div class="englishMeaning">${data.translation}</div>
                        </div>
                    </div>
                `;
      } catch (error) {
        console.log(error);
      }
    };

    fetchKural();
  } else {
    alert("Please Enter A Valid Value between 1 and 1330.");
    inputNumber.value = ""; // Löscht das Eingabefeld
  }
});
