import { Component, render } from "inferno";
import { createElement } from "inferno-create-element";
import { animate } from "motion";

class CounterDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.counterRef = null;
  }

  componentDidUpdate(_, prevState) {
    if (this.counterRef && prevState.count !== this.state.count) {
      animate(
        this.counterRef,
        { scale: [1.2, 1], opacity: [0.5, 1] },
        { duration: 0.2, easing: "ease-out" },
      );
    }
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    const doubleCount = this.state.count * 2; // Computed value

    return (
      <div class="flex flex-col items-center space-y-4 p-4">
        <h2 class="text-xl font-bold">Computed Counter</h2>

        {/* Counter Display */}
        <div
          ref={(el) => (this.counterRef = el)}
          class="text-4xl font-bold bg-blue-500 text-white p-4 rounded-lg shadow-lg"
        >
          {this.state.count}
        </div>

        {/* Computed Value Display */}
        <p class="text-gray-600">Double: {doubleCount}</p>

        {/* Controls */}
        <div class="flex space-x-4">
          <button
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={this.increment}
          >
            +
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={this.decrement}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

export default CounterDefault;
