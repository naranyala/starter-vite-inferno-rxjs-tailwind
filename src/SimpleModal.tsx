import { Component, render } from "inferno";
import { createElement } from "inferno-create-element";

class SimpleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const modalContent = (
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-4">Modal Title</h2>
        <p class="text-gray-700 mb-6">
          This is a simple modal dialog. You can put any content here that you
          want to display to the user.
        </p>
        <div class="flex justify-end gap-2">
          <button
            class="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={this.toggleModal}
          >
            Close
          </button>
          <button
            class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => console.log("Action clicked")}
          >
            Action
          </button>
        </div>
      </div>
    );

    return (
      <div>
        <button
          class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={this.toggleModal}
        >
          Open Modal
        </button>

        {this.state.isModalOpen && (
          <div class="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div class="relative">{modalContent}</div>
          </div>
        )}
      </div>
    );
  }
}

export default SimpleModal;
