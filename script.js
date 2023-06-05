// Zde můžete definovat slova pro jednotlivá témata
const words = {
    Filmy: ["matrix", "titanic", "avatar", "počátek", "pelíšky", "kmotr", "sedm", "terminátor", "interstellar", "avengers", "vetřelec"],
    Zvířata: ["pes", "kočka", "slon", "lev", "žirafa", "plameňák", "hroch", "nosorožec", "gorila", "zebra", "tygr", "krokodýl"],
    Země: ["česko", "francie", "rusko", "dánsko", "finsko", "kanada", "kazachstán", "lotyšsko", "německo", "norsko", "rakousko", "slovensko", "švédsko", "švýcarsko", "usa", "maďarsko", "slovinsko"]
  };
  
  let selectedWord = "";
  let guessedLetters = [];
  let remainingLives = 7;
  
  const diacritics = {
    "á": "a",
    "č": "c",
    "d": "ď",
    "ě": "e",
    "é": "e",
    "i": "í",
    "n": "ň",
    "o": "ó",
    "r": "ř",
    "t": "ť",
    "u": "ů",
    "u": "ú",
    "y": "ý",
    "z": "ž"
    // Další diakritické znaky a jejich ekvivalentní písmena
  };
  // Funkce pro výběr náhodného slova z daného tématu
  function selectWord(topic) {
    const wordList = words[topic];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  }
  
  // Funkce pro vykreslení tlačítek s abecedou
  function renderAlphabet() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const lettersContainer = document.getElementById("letters");
    lettersContainer.innerHTML = "";
    
    for (let letter of alphabet) {
      const button = document.createElement("button");
      button.innerText = letter;
      button.addEventListener("click", () => {
        handleLetterClick(letter);
      });
      lettersContainer.appendChild(button);
    }
  }
  
  // Funkce pro aktualizaci zobrazení hádaného slova
  function updateDisplayedWord() {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = "";
  
    for (let letter of selectedWord) {
      const span = document.createElement("span");
      if (guessedLetters.includes(letter) || (diacritics[letter] && guessedLetters.includes(diacritics[letter]))) {
        span.innerText = letter;
      } else {
        span.innerText = "_";
      }
      wordContainer.appendChild(span);
    }
  }
  
  // Funkce pro aktualizaci obrázku šibenice
  function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangman-image");
    hangmanImage.src = `images/${7 - remainingLives}.png`;
  }
  
  // Funkce pro zpracování kliknutí na písmeno
  function handleLetterClick(letter) {
    if (guessedLetters.includes(letter)) {
      return;
    }
    
    guessedLetters.push(letter);
    
    let isCorrect = false;

  for (let char of selectedWord) {
    if (char === letter || (diacritics[char] && diacritics[char] === letter)) {
      isCorrect = true;
      break;
    }
  }

  if (isCorrect) {
    updateDisplayedWord();

    if (!document.getElementById("word").innerText.includes("_")) {
      endGame(true);
    }
  } else {
    remainingLives--;
    updateHangmanImage();

    if (remainingLives === 0) {
      endGame(false);
    }
  }

  const letterButton = document.querySelector(`#letters button:nth-child(${letter.charCodeAt(0) - 96})`);
  letterButton.disabled = true;
  }
  
  // Funkce pro ukončení hry a zobrazení výsledku
  function endGame(won) {
    const message = document.createElement("p");
    message.classList.add("message");
    message.innerText = won ? "Vyhrál jsi!" : `Prohrál jsi! Hádané slovo bylo ${selectedWord}`;
    
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    optionsContainer.appendChild(message);
    const restartButton = document.getElementById("game-result");
    restartButton.classList.remove("hide");
  }
  
  // Funkce pro resetování hry
  function resetGame() {
    selectedWord = "";
    guessedLetters = [];
    remainingLives = 7;
    
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    
    const topics = Object.keys(words);
    for (let topic of topics) {
      const button = document.createElement("button");
      button.innerText = topic;
      button.addEventListener("click", () => {
        startGame(topic);
      });
      optionsContainer.appendChild(button);
    }
    
    const hangmanImage = document.getElementById("hangman-image");
    hangmanImage.src = "images/0.png";
    
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = "";
    
    const lettersContainer = document.getElementById("letters");
    lettersContainer.innerHTML = "";

    const restartButton = document.getElementById("game-result"); 
    restartButton.classList.add("hide");

  }
  
  // Funkce pro spuštění hry
  function startGame(topic) {
    const optionsContainer = document.getElementById("options");
    
  
    selectedWord = selectWord(topic);
    guessedLetters = [];
    remainingLives = 7;
  
    renderAlphabet();
    updateDisplayedWord();
    updateHangmanImage();
  }
  
  // Spustit hru po načtení stránky
  document.addEventListener("DOMContentLoaded", () => {
    resetGame();  
  });