// script.js
const board = document.getElementById("board");

// Create 9x9 grid of input boxes
for (let i = 0; i < 81; i++) {
  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("min", "1");
  input.setAttribute("max", "9");
  input.setAttribute("id", `cell-${i}`);
  board.appendChild(input);
}

function resetSudoku() {
    for (let i = 0; i < 81; i++) {
      document.getElementById(`cell-${i}`).value = "";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
  }
  

function getBoard() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      const val = document.getElementById(`cell-${i * 9 + j}`).value;
      row.push(val === "" ? 0 : parseInt(val));
    }
    grid.push(row);
  }
  return grid;
}

function setBoard(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.getElementById(`cell-${i * 9 + j}`);
      cell.value = grid[i][j] === 0 ? "" : grid[i][j];
    }
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num)
      return false;
  }
  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num)
        return false;
    }
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
    const board = getBoard();
    if (!isValidBoard(board)) {
      alert("Invalid Sudoku input.");
      return;
    }
    if (solve(board)) {
      setBoard(board);
      alert("Solved!");
    } else {
      alert("No solution found.");
    }
  }
  
  function isValidBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const val = board[row][col];
        if (val !== 0) {
          board[row][col] = 0;
          if (!isValid(board, row, col, val)) {
            document.getElementById(`cell-${row * 9 + col}`).style.backgroundColor = "#ffcccc";
            board[row][col] = val;
            return false;
          }
          board[row][col] = val;
        }
      }
    }
    return true;
  }
  
