import { render } from "inferno";
import { createElement } from "inferno-create-element";
import { Component } from "inferno";
import { signal, computed, effect } from "@preact/signals";
import { animate } from "motion";

const count = signal(0);
const doubleCount = computed(() => count.value * 2);
const counterRef = signal<HTMLElement | null>(null);

class CounterSignal extends Component {
  constructor(props) {
    super(props);
    // Initial state from signals
    this.state = {
      count: count.value,
      double: doubleCount.value,
    };

    // Bind methods
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  componentDidMount() {
    // Subscribe to count signal
    this.countUnsubscribe = effect(() => {
      this.setState({ count: count.value });
      if (counterRef.value) {
        animate(
          counterRef.value,
          { scale: [1.2, 1], opacity: [0.5, 1] },
          { duration: 0.2, easing: "ease-out" },
        );
      }
    });

    // Subscribe to doubleCount computed signal
    this.doubleUnsubscribe = effect(() => {
      this.setState({ double: doubleCount.value });
    });
  }

  componentWillUnmount() {
    // Cleanup subscriptions
    if (this.countUnsubscribe) this.countUnsubscribe();
    if (this.doubleUnsubscribe) this.doubleUnsubscribe();
  }

  handleIncrement() {
    count.value++;
  }

  handleDecrement() {
    count.value--;
  }

  render() {
    return (
      <div class="flex flex-col items-center space-y-4 p-4">
        <h2 class="text-xl font-bold">Computed Counter</h2>

        {/* Counter Display */}
        <div
          ref={(el) => (counterRef.value = el)}
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

export default CounterSignal;
