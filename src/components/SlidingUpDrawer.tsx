import { Component, render } from "inferno";
import { createElement } from "inferno-create-element";
import { animate } from "motion";

class SlidingUpDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.drawerRef = null;
  }

  componentDidUpdate(_, prevState) {
    if (this.drawerRef && prevState.isOpen !== this.state.isOpen) {
      animate(
        this.drawerRef,
        {
          transform: this.state.isOpen ? "translateY(0%)" : "translateY(100%)",
        },
        { duration: 0.3, easing: "ease-in-out" },
      );
    }
  }

  toggleDrawer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <button
          class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={this.toggleDrawer}
        >
          Open Drawer
        </button>

        <div
          class={`fixed inset-0 flex items-end justify-center z-50 transition-opacity duration-300 
            ${this.state.isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          {/* Backdrop */}
          <div
            class="absolute inset-0 bg-black/50 bg-opacity-50 transition-opacity duration-300"
            onClick={this.toggleDrawer}
          ></div>

          {/* Drawer */}
          <div
            ref={(el) => (this.drawerRef = el)}
            class="relative bg-white w-full max-w-md p-6 rounded-t-lg shadow-lg transform"
            style={{ transform: "translateY(100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 class="text-2xl font-bold mb-4">Drawer Title</h2>
            <p class="text-gray-700 mb-6">
              This is a sliding-up drawer. You can add content here.
            </p>
            <div class="flex justify-end">
              <button
                class="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={this.toggleDrawer}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SlidingUpDrawer;
