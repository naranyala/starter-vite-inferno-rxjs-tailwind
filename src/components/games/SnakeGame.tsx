import { Component, render } from "inferno";
import { createElement } from "inferno-create-element";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

class SnakeGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: INITIAL_SNAKE,
      food: this.generateFood(INITIAL_SNAKE),
      direction: { x: 1, y: 0 },
      gameOver: false,
      score: 0,
    };
    this.gameLoop = null;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    this.startGame();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    clearInterval(this.gameLoop);
  }

  generateFood = (currentSnake = this.state.snake) => {
    // Create a new food location that isn't on the snake
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    );
    return newFood;
  };

  handleKeyPress = (e) => {
    const newDirection = DIRECTIONS[e.key];
    if (newDirection && !this.isOppositeDirection(newDirection)) {
      this.setState({ direction: newDirection });
    }
  };

  isOppositeDirection = (newDir) => {
    const { direction } = this.state;
    return (
      newDir.x === -direction.x && newDir.y === -direction.y
    );
  };

  moveSnake = () => {
    if (this.state.gameOver) return;

    this.setState((prevState) => {
      const newSnake = [...prevState.snake];
      const head = {
        x: newSnake[0].x + prevState.direction.x,
        y: newSnake[0].y + prevState.direction.y,
      };

      // Check boundaries
      if (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE ||
        newSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        clearInterval(this.gameLoop);
        return { gameOver: true };
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        return {
          snake: newSnake,
          food: this.generateFood(newSnake),
          score: prevState.score + 1,
        };
      }

      newSnake.pop();
      return { snake: newSnake };
    });
  };

  startGame = () => {
    this.gameLoop = setInterval(this.moveSnake, 100);
  };

  resetGame = () => {
    clearInterval(this.gameLoop);
    const initialSnake = INITIAL_SNAKE.slice();
    this.setState({
      snake: initialSnake,
      food: this.generateFood(initialSnake),
      direction: { x: 1, y: 0 },
      gameOver: false,
      score: 0,
    });
    this.startGame();
  };

  render() {
    const { snake, food, gameOver, score } = this.state;

    // Create grid
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(seg => seg.x === x && seg.y === y);
        const isFood = food.x === x && food.y === y;
        const isHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;

        cells.push(
          <div
            key={`${x}-${y}`}
            class={`border border-gray-200 absolute ${isHead ? 'bg-green-700' :
              isSnake ? 'bg-green-500' :
                isFood ? 'bg-red-500 rounded-full' : ''
              }`}
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              left: `${x * CELL_SIZE}px`,
              top: `${y * CELL_SIZE}px`,
            }}
          />
        );
      }
    }

    return (
      <div class="flex flex-col items-center p-4">
        <h2 class="text-xl font-bold mb-4">Snake Game</h2>

        <div class="mb-4">
          <span class="text-lg">Score: {score}</span>
        </div>

        {/* Game Board */}
        <div
          class="relative bg-gray-100 border-2 border-gray-300"
          style={{
            width: `${GRID_SIZE * CELL_SIZE}px`,
            height: `${GRID_SIZE * CELL_SIZE}px`,
          }}
        >
          {cells}
        </div>

        {/* Game Controls */}
        <div class="mt-4 text-center text-gray-600">
          <p>Use arrow keys to move</p>
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div class="mt-4 flex flex-col items-center space-y-4">
            <div class="text-2xl text-red-500 font-bold">Game Over!</div>
            <div class="text-lg">Final Score: {score}</div>
            <button
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={this.resetGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default SnakeGame;

// To use:
// render(<SnakeGame />, document.getElementById("root"));
