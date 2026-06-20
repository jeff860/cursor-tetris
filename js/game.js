// 2-Player game logic (Placeholder)
// Need to instantiate two game instances.
console.log("2P game logic initialized");

class TetrisGame {
  constructor(id) {
    this.canvas = document.getElementById('board-' + id);
    this.ctx = this.canvas.getContext('2d');
    this.score = 0;
  }
}

const game1 = new TetrisGame(1);
const game2 = new TetrisGame(2);

document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('overlay').classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  // P1 controls (Numpad)
  // P2 controls (WASD)
  console.log("Key pressed:", e.code);
});
