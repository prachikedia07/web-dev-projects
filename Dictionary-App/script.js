const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

document.getElementById("search-btn").addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value.trim();
    if (!inpWord) return;

    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0].meanings[0].definitions[0]);
            if (!Array.isArray(data) || !data[0]) {
                result.innerHTML = `<p class="error">No results found for "${inpWord}"</p>`;
                return;
            }

            const word = data[0].word || inpWord;
            const phonetic = data[0].phonetic || (data[0].phonetics.find(p => p.text)?.text) || "";
            const audioSrc = data[0].phonetics.find(p => p.audio)?.audio || "";

            const meaningObj = data[0].meanings[0];
            const partOfSpeech = meaningObj?.partOfSpeech || "";
            const definition = meaningObj?.definitions[0]?.definition || "No definition found.";
            const example = meaningObj?.definitions[0]?.example || "";

            if (audioSrc && !audioSrc.startsWith("http")) {
                sound.setAttribute("src", "https:" + audioSrc);
            } else {
                sound.setAttribute("src", audioSrc);
            }

            result.innerHTML = `
                <div class="word">
                    <h3>${word}</h3>
                    <button onclick="playSound()"> <i class="fas fa-volume-up"></i></button>
                </div>
                <div class="details">
                    <p>${partOfSpeech}</p>
                    <p>${phonetic}</p>
                </div>
                <p class="word-meaning">${definition}</p>
                <p class="word-example">${example}</p>`;
        })
        .catch((err) => {
            console.log("Error:", err);
            result.innerHTML = `<p class="error">An error occurred. Try again.</p>`;
        });
});

function playSound() {
    sound.play().catch(err => console.log("Audio error:", err));
}
