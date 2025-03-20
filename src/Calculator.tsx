/** @jsx createElement */
import { Component, render } from "inferno";
import { createElement } from "inferno-create-element";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: 0,
    };
  }

  handleInput = (value) => {
    this.setState({ input: this.state.input + value });
  };

  clearInput = () => {
    this.setState({ input: "", result: 0 });
  };

  calculateResult = () => {
    try {
      this.setState({ result: eval(this.state.input) || 0 });
    } catch (error) {
      this.setState({ result: "Error" });
    }
  };

  render() {
    return (
      <div class="flex flex-col items-center p-4 border rounded w-80">
        <div class="w-full bg-gray-100 p-2 text-right text-lg rounded">
          {this.state.input || "0"}
        </div>
        <div class="w-full bg-gray-200 p-2 text-right text-2xl font-bold">
          = {this.state.result}
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          {["7", "8", "9", "/"].map((val) => (
            <button
              class="p-2 bg-blue-400 text-white rounded"
              onClick={() => this.handleInput(val)}
            >
              {val}
            </button>
          ))}
          {["4", "5", "6", "*"].map((val) => (
            <button
              class="p-2 bg-blue-400 text-white rounded"
              onClick={() => this.handleInput(val)}
            >
              {val}
            </button>
          ))}
          {["1", "2", "3", "-"].map((val) => (
            <button
              class="p-2 bg-blue-400 text-white rounded"
              onClick={() => this.handleInput(val)}
            >
              {val}
            </button>
          ))}
          {["0", ".", "C", "+"].map((val) => (
            <button
              class={`p-2 text-white rounded ${val === "C" ? "bg-red-500" : "bg-blue-400"
                }`}
              onClick={() =>
                val === "C" ? this.clearInput() : this.handleInput(val)
              }
            >
              {val}
            </button>
          ))}
          <button
            class="col-span-4 p-2 bg-green-500 text-white rounded"
            onClick={this.calculateResult}
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
