document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  const info = document.querySelector(".info");
  const resetButton = document.getElementById("reset");
  const gameModeSelect = document.getElementById("gameMode");

  let currentPlayer = "X";
  let moves = 0;
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let isAIEnabled = false;

  // Event listener for each box
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (box.textContent === "" && !isGameOver()) {
        box.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;
        moves++;

        if (checkWinner()) {
          info.textContent = `Player ${currentPlayer} wins!`;
        } else if (moves === 9) {
          info.textContent = "It's a draw!";
        } else {
          togglePlayer();
          if (isAIEnabled && currentPlayer === "O") {
            makeAIMove();
          }
        }
      }
    });
  });

  // Event listener for the reset button
  resetButton.addEventListener("click", () => {
    resetGame();
  });

  // Event listener for game mode selection
  gameModeSelect.addEventListener("change", () => {
    isAIEnabled = gameModeSelect.value === "1";
    resetGame();
  });

  // Function to toggle between X and O players
  const togglePlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    info.textContent = `Turn: Player ${currentPlayer}`;
  };

  // Function to check for a winner
  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
        highlightWinner(pattern);
        return true;
      }
    }

    return false;
  };

  // Function to check if the game is over
  const isGameOver = () => {
    return checkWinner() || moves === 9;
  };

  // Function to highlight the winning combination
  const highlightWinner = (pattern) => {
    for (const index of pattern) {
      boxes[index].classList.add("winner");
    }
  };

  // Function to reset the game
  const resetGame = () => {
    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("winner");
    });

    currentPlayer = "X";
    moves = 0;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    info.textContent = `Turn: Player ${currentPlayer}`;
  };

  // Function to make AI move
  const makeAIMove = () => {
    // Add your AI logic here
    // For simplicity, let's make a random move for the AI
    const emptyBoxes = Array.from(boxes).filter((box) => box.textContent === "");
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    const aiBox = emptyBoxes[randomIndex];

    if (aiBox) {
      aiBox.textContent = currentPlayer;
      const aiIndex = Array.from(boxes).indexOf(aiBox);
      gameBoard[aiIndex] = currentPlayer;

      if (checkWinner()) {
        info.textContent = `Player ${currentPlayer} wins!`;
      } else if (moves === 9) {
        info.textContent = "It's a draw!";
      } else {
        togglePlayer();
      }
    }
  };
});
