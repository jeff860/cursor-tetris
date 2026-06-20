// 2-Player Game Engine
class TetrisGame {
  constructor(id, controls) {
    this.canvas = document.getElementById('board-' + id);
    this.ctx = this.canvas.getContext('2d');
    this.scoreEl = document.getElementById('score-' + id);
    this.controls = controls; // {left, right, down, rotate, drop}
    
    this.board = createBoard();
    this.state = STATE.IDLE;
    this.currentPiece = null;
    this.nextPiece = randomPieceType();
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.lastDrop = 0;
    this.dropInterval = getDropInterval(1);
    this.animationId = null;

    this.draw();
  }

  start() {
    this.state = STATE.PLAYING;
    this.spawnPiece();
    this.lastDrop = performance.now();
    this.loop(performance.now());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    drawGrid(this.ctx, COLS, ROWS);
    // Draw board content... (simplified for now)
  }

  spawnPiece() {
    this.currentPiece = createPiece(this.nextPiece);
    this.nextPiece = randomPieceType();
    if (!isValidPosition(this.board, this.currentPiece)) {
      this.state = STATE.GAMEOVER;
    }
  }

  move(dx, dy) {
    if (this.state !== STATE.PLAYING) return;
    if (isValidPosition(this.board, this.currentPiece, dx, dy)) {
      this.currentPiece.x += dx;
      this.currentPiece.y += dy;
      this.draw();
    }
  }

  rotate() {
    if (this.state !== STATE.PLAYING) return;
    const rotated = rotatePiece(this.currentPiece);
    if (isValidPosition(this.board, rotated)) {
      this.currentPiece = rotated;
      this.draw();
    }
  }

  loop(timestamp) {
    if (this.state !== STATE.PLAYING) return;
    if (timestamp - this.lastDrop >= this.dropInterval) {
      // Drop logic...
      this.lastDrop = timestamp;
    }
    this.draw();
    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }
}

const STATE = { IDLE: 'idle', PLAYING: 'playing', GAMEOVER: 'gameover' };

// Initialize P1 and P2
const p1Controls = { left: 'Numpad4', right: 'Numpad6', down: 'Numpad2', rotate: 'Numpad8', drop: 'Numpad0' };
const p2Controls = { left: 'KeyA', right: 'KeyD', down: 'KeyS', rotate: 'KeyW', drop: 'KeyF' };

const game1 = new TetrisGame(1, p1Controls);
const game2 = new TetrisGame(2, p2Controls);

document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('overlay').classList.add('hidden');
  game1.start();
  game2.start();
});

document.addEventListener('keydown', (e) => {
  // Handle P1 and P2 controls
});
