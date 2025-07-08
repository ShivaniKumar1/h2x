// Answers to the questions
const answers = {
  1: ["raptors", "toronto raptors"],
  2: ["clove"],
  3: ["miami heat", "heat"],
  5: ["stephen curry", "steph curry", "curry"],
  6: ["come"],
  7: ["okc vs pacers", "pacers vs okc", "pacers vs thunder", "thunder vs pacers"],
  9: ["i really like to play valorant with vee"],
  10: ["hunted", "ahsan", "me"]
};

// Begin puzzle function
function beginPuzzle() {
  currentQuestion = 0;
  showNextQuestion(currentQuestion);
  document.getElementById("beginPuzzle").disabled = true;
}

// Restart puzzle function
function restartPuzzle() {
  document.getElementById("restartBtn").addEventListener("click", function() {
    location.reload();
  });
}

// Show next question function
function showNextQuestion(index) {
  if (index === 10) {
    //document.getElementById("finalMessage").classList.remove("hidden");
    document.getElementById("heading").style.display = "none";
    document.getElementById("level10").style.display = "none";
    document.getElementById("finalMessage").style.display = "block";
  } else {
    const allQuestions = document.querySelectorAll('.question');
    allQuestions.forEach((question, i) => {
      question.style.display = i === index ? 'block' : 'none';
    });
  }
}

// Hide/show hints function
function toggleHint(level) {
  const hint = document.getElementById(`hint${level}`);
  const button = document.querySelector(`#level${level} .hint-button`);

  if (hint.classList.contains("hidden")) {
    hint.classList.remove("hidden");
    button.innerText = "Hide Hint";
  } else {
    hint.classList.add("hidden");
    button.innerText = "Show Hint";
  }
}

// Call vee function
function callVee() {
  const popup = document.getElementById("callVeePopup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

// Check answer function
function checkAnswer(index) {
  const input = document.getElementById(`answer${index}`).value.toLowerCase();
  const feedback = document.getElementById(`feedback${index}`);

  if (answers[index].includes(input)) {
    showNextQuestion(index);
  } else {
    feedback.innerText = "❌ WRONG! Try again.";
    feedback.style.color = "#ff6b81";
  }
}

// Check sudoku function
function checkSudoku() {
  const table = document.getElementById("sudokubox");
  let grid = [];

  // Read the sudoku inputs
  for (let i = 0; i < 4; i++) {
    grid[i] = [];
    for (let j = 0; j < 4; j++) {
      const input = table.rows[i].cells[j].querySelector("input");
      const val = input.value.trim();

      // Checks to see if there is a number in each cell
      if (!val || isNaN(val)) {
        document.getElementById("feedback4").innerText = "Please fill all the cells with numbers.";
        document.getElementById("feedback4").style.color = "#ff6b81";
        return;
      }

      // Checks to see if the numbers are between 1 and 4
      grid[i][j] = parseInt(val);
      if (grid[i][j] < 1 || grid[i][j] > 4) {
        document.getElementById("feedback4").innerText = "Numbers must be between 1 and 4.";
        document.getElementById("feedback4").style.color = "#ff6b81";
        return;
      }
    }
  }

  // Check rows
  for (let i = 0; i < 4; i++) {
    let rowSet = new Set;
    for (let j = 0; j < 4; j++) {
      rowSet.add(grid[i][j]);
    }
    if (rowSet.size !== 4 || !rowSet.has(1) || !rowSet.has(2) || !rowSet.has(3) || !rowSet.has(4)) {
      sudokuError("Row " + (i + 1) + " must contain unique numbers.")
      return;
    }
  }

  // Check columns
  for (let j = 0; j < 4; j++) {
    let columnSet = new Set();
    for (let i = 0; i < 4; i++) {
      columnSet.add(grid[i][j]);
    }
    if (columnSet.size !== 4 || !columnSet.has(1) || !columnSet.has(2) || !columnSet.has(3) || !columnSet.has(4)) {
      sudokuError("Column " + (j + 1) + " must contain unique numbers.")
      return;
    }
  }

  // Check 2x2 boxes
  const boxSize = [[0, 0], [0, 2], [2, 0], [2, 2]];
  for (let z = 0; z < boxSize.length; z++) {
    const [x, y] = boxSize[z];
    let boxSet = new Set();
    for (let i = x; i < x + 2; i++) {
      for (let j = y; j < y + 2; j++) {
        boxSet.add(grid[i][j]);
      }
    }
    if (boxSet.size !== 4 || !boxSet.has(1) || !boxSet.has(2) || !boxSet.has(3) || !boxSet.has(4)) {
      sudokuError("2x2 box " + (z + 1) + " must contain unique numbers.");
      return;
    }
  }

  // If all checks pass, show the next question
  document.getElementById("feedback4").innerText = "Good job! 😼 Sudoku completed.";
  document.getElementById("feedback4").style.color = "#b085f5";
  showNextQuestion(4);
}

function sudokuError(msg) {
  document.getElementById("feedback4").innerText = "❌ " + msg;
  document.getElementById("feedback4").style.color = "#ff6b81";
}

// Scramble levels logic
const scrambleWords = [
  { word: "monster", scrambled: "eosrmtn" },
  { word: "mango", scrambled: "onamg" },
  { word: "valorant", scrambled: "anvoltar" },
];

function startScramble() {
  scrambleIndex = 0;
  showScrambledWord();
  clearScrambleFeedback();
}

function showScrambledWord() {
  const choice = scrambleWords[scrambleIndex];
  const word = document.getElementById("scrambledWord");
  word.innerText = choice.scrambled;

  const answer = document.getElementById("scrambleAnswer");
  answer.value = "";
  answer.focus();
  clearScrambleFeedback();
}

function clearScrambleFeedback() {
  const feedback = document.getElementById("scrambleFeedback");
  feedback.innerText = "";
  feedback.style.color = "";
}

function checkScramble() {
  const answer = document.getElementById("scrambleAnswer").value.toLowerCase();
  const feedback = document.getElementById("scrambleFeedback");
  const correct = scrambleWords[scrambleIndex].word;

  if (answer === correct) {
    feedback.innerText = `Correct! 😼 ${scrambleIndex + 1} of 3 solved.`;
    feedback.style.color = "#b085f5";

    scrambleIndex++;

    if (scrambleIndex < 3) {
      setTimeout(() => {
        showScrambledWord();
      }, 1000);
    } else {
      // Once all 3 levels are completed, show the next question
      setTimeout(() => {
        feedback.innerText = "All words unscrambled! 🎉 Next question...";
        setTimeout(() => {
          showNextQuestion(8);
        }, 1000);
      }, 1000);
    }
  } else {
    feedback.innerText = "❌ WRONG! Try again.";
    feedback.style.color = "#ff6b81";
  }
}