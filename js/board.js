function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function isValidPosition(board, piece, offsetX = 0, offsetY = 0) {
  const matrix = piece.matrix;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!matrix[row][col]) continue;

      const x = piece.x + col + offsetX;
      const y = piece.y + row + offsetY;

      if (x < 0 || x >= COLS || y >= ROWS) return false;
      if (y >= 0 && board[y][x]) return false;
    }
  }
  return true;
}

function lockPiece(board, piece) {
  const newBoard = board.map(row => [...row]);
  const matrix = piece.matrix;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!matrix[row][col]) continue;

      const x = piece.x + col;
      const y = piece.y + row;
      if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
        newBoard[y][x] = piece.type;
      }
    }
  }
  return newBoard;
}

function clearLines(board) {
  const newBoard = [];
  let cleared = 0;

  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row].every(cell => cell !== null)) {
      cleared++;
    } else {
      newBoard.unshift(board[row]);
    }
  }

  while (newBoard.length < ROWS) {
    newBoard.unshift(Array(COLS).fill(null));
  }

  return { board: newBoard, cleared };
}

function getGhostY(board, piece) {
  let ghostY = piece.y;
  while (isValidPosition(board, piece, 0, ghostY - piece.y + 1)) {
    ghostY++;
  }
  return ghostY;
}

function getDropInterval(level) {
  const speeds = [1000, 800, 600, 500, 400, 300, 250, 200, 150, 100, 80, 60, 50, 40, 30];
  return speeds[Math.min(level - 1, speeds.length - 1)];
}

function getScoreForLines(lines, level) {
  const base = [0, 100, 300, 500, 800];
  return base[lines] * level;
}
