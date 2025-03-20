import { createElement } from "inferno-create-element";
import { Component } from "inferno";
import { createElement } from "inferno-create-element";
import mitt from "mitt";

// Create an event emitter
const emitter = mitt();

class Step {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

class Stepper extends Component {
  constructor(props) {
    super(props);

    this.steps = [
      new Step(1, "Step 1", "This is the first step content"),
      new Step(2, "Step 2", "This is the second step content"),
      new Step(3, "Step 3", "This is the final step content"),
    ];

    this.state = {
      currentStep: 1,
    };

    // Bind methods
    this.handleStepChange = this.handleStepChange.bind(this);
    this.goToStep = this.goToStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  componentDidMount() {
    emitter.on("step:change", this.handleStepChange);
  }

  componentWillUnmount() {
    emitter.off("step:change", this.handleStepChange);
    emitter.all.clear();
  }

  handleStepChange(step) {
    console.log(`Step changed to: ${step}`);
    // No need for forceUpdate as setState will trigger re-render
  }

  getCurrentContent() {
    const step = this.steps.find((s) => s.id === this.state.currentStep);
    return step
      ? { title: step.title, content: step.content }
      : { title: "", content: "" };
  }

  goToStep(step) {
    if (step >= 1 && step <= this.steps.length) {
      this.setState({ currentStep: step }, () => {
        emitter.emit("step:change", step);
      });
    }
  }

  nextStep() {
    if (this.state.currentStep < this.steps.length) {
      this.goToStep(this.state.currentStep + 1);
    }
  }

  prevStep() {
    if (this.state.currentStep > 1) {
      this.goToStep(this.state.currentStep - 1);
    }
  }

  render() {
    const currentContent = this.getCurrentContent();

    return (
      <div className="max-w-2xl mx-auto my-8">
        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {this.steps.map((step) => (
            <div className="flex flex-col items-center" key={step.id}>
              <button
                onClick={() => this.goToStep(step.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                  ${this.state.currentStep === step.id
                    ? "bg-blue-500"
                    : this.state.currentStep > step.id
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
              >
                {step.id}
              </button>
              <span className="mt-2 text-sm">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{currentContent.title}</h2>
          <p className="text-gray-600">{currentContent.content}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={this.prevStep}
            disabled={this.state.currentStep === 1}
            className={`px-4 py-2 rounded-md
              ${this.state.currentStep === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
          >
            Previous
          </button>
          <button
            onClick={this.nextStep}
            disabled={this.state.currentStep === this.steps.length}
            className={`px-4 py-2 rounded-md
              ${this.state.currentStep === this.steps.length
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Stepper;
