import { render } from "inferno";
import { createElement } from "inferno-create-element";
import { Component } from "inferno";
import { createStore } from "@xstate/store";
import { animate } from "motion";

// Create a store with an initial state
const store = createStore({
  count: 0,
});

// Computed property for double count
const doubleCount = store.select((state) => state.count * 2);

class ComputedCounter extends Component {
  constructor(props) {
    super(props);
    // Initial state from store
    this.state = {
      count: store.get().count,
      double: doubleCount.get(),
    };

    // Reference for counter animation
    this.counterRef = null;

    // Bind methods
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount() {
    // Subscribe to store updates
    this.unsubscribeCount = store.subscribe((state) => {
      this.setState({ count: state.count });
      if (this.counterRef) {
        animate(
          this.counterRef,
          { scale: [1.2, 1], opacity: [0.5, 1] },
          { duration: 0.2, easing: "ease-out" },
        );
      }
    });

    // Subscribe to doubleCount updates
    this.unsubscribeDouble = doubleCount.subscribe((value) => {
      this.setState({ double: value });
    });
  }

  componentWillUnmount() {
    // Cleanup subscriptions
    this.unsubscribeCount();
    this.unsubscribeDouble();
  }

  handleIncrement() {
    store.update((state) => ({ count: state.count + 1 }));
  }

  handleDecrement() {
    store.update((state) => ({ count: state.count - 1 }));
  }

  render() {
    return (
      <div class="flex flex-col items-center space-y-4 p-4">
        <h2 class="text-xl font-bold">ComputedCounter</h2>

        {/* Counter Display */}
        <div
          ref={(el) => (this.counterRef = el)}
          class="text-4xl font-bold bg-blue-500 text-white p-4 rounded-lg shadow-lg"
        >
          {this.state.count}
        </div>

        {/* Computed Value Display */}
        <p class="text-gray-600">Double: {this.state.double}</p>

        {/* Controls */}
        <div class="flex space-x-4">
          <button
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={this.handleIncrement}
          >
            +
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={this.handleDecrement}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

export default ComputedCounter;
