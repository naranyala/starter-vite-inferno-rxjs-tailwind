import { createElement } from "inferno-create-element";
import { Component, render } from "inferno";
import { createMachine, assign, interpret } from "xstate";

// Define Calculator State Machine
const calculatorMachine = createMachine({
  id: "calculator",
  initial: "idle",
  context: { input: "", result: 0 },
  states: {
    idle: {
      on: {
        ADD_INPUT: {
          actions: assign({
            input: (context, event) => context.input + event.value,
          }),
        },
        CLEAR: {
          actions: assign({ input: "", result: 0 }),
        },
        CALCULATE: {
          actions: assign({
            result: (context) => {
              try {
                return eval(context.input) || 0;
              } catch {
                return "Error";
              }
            },
          }),
        },
      },
    },
  },
});

class CalculatorXstate extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      input: "",
      result: 0
    };

    // Create the interpreter
    this.service = interpret(calculatorMachine)
      .onTransition(state => {
        // Update component state when machine state changes
        this.setState(state.context);
      });
  }

  componentDidMount() {
    // Start the service when component mounts
    this.service.start();
  }

  componentWillUnmount() {
    // Stop the service when component unmounts
    this.service.stop();
  }

  handleInput(value) {
    this.service.send({ type: "ADD_INPUT", value });
  }

  clearInput() {
    this.service.send({ type: "CLEAR" });
  }

  calculateResult() {
    this.service.send({ type: "CALCULATE" });
  }

  render() {
    const { input, result } = this.state;

    return (
      <div className="flex flex-col items-center p-4 border rounded w-80">
        <div className="w-full bg-gray-100 p-2 text-right text-lg rounded">
          {input || "0"}
        </div>
        <div className="w-full bg-gray-200 p-2 text-right text-2xl font-bold">
          = {result}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {["7", "8", "9", "/"].map((val) => (
            <button
              key={val}
              className="p-2 bg-blue-400 text-white rounded"
              onClick={() => this.handleInput(val)}
            >
              {val}
            </button>
          ))}
          {["4", "5", "6", "*"].map((val) => (
            <button
              key={val}
              className="p-2 bg-blue-400 text-white rounded"
              onClick={() => this.handleInput(val)}
            >
              {val}
            </button>
          ))}
          {["1", "2", "3", "-"].map((val) => (
            <button
              key={val}
              className="p-2 bg-blue-400 text-white rounded"
              onClick={() => this.handleInput(val)}
            >
              {val}
            </button>
          ))}
          {["0", ".", "C", "+"].map((val) => (
            <button
              key={val}
              className={`p-2 text-white rounded ${val === "C" ? "bg-red-500" : "bg-blue-400"}`}
              onClick={() =>
                val === "C" ? this.clearInput() : this.handleInput(val)
              }
            >
              {val}
            </button>
          ))}
          <button
            className="col-span-4 p-2 bg-green-500 text-white rounded"
            onClick={() => this.calculateResult()}
          >
            =
          </button>
        </div>
      </div>
    );
  }
}

export default CalculatorXstate;
