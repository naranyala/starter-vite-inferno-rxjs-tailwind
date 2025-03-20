import { Component, render } from "inferno";
import { createElement } from "inferno-create-element";
import { animate } from "motion";

// Sample tree data structure
const initialTreeData = {
  name: "Root",
  children: [
    {
      name: "Folder 1",
      children: [{ name: "Leaf 1.1" }, { name: "Leaf 1.2" }],
    },
    {
      name: "Folder 2",
      children: [
        { name: "Leaf 2.1" },
        {
          name: "Subfolder 2.2",
          children: [{ name: "Leaf 2.2.1" }],
        },
      ],
    },
  ],
};

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.nodeRef = null;
  }

  componentDidUpdate(_, prevState) {
    if (this.nodeRef && prevState.isOpen !== this.state.isOpen) {
      animate(
        this.nodeRef,
        {
          height: this.state.isOpen ? ["0px", "auto"] : ["auto", "0px"],
          opacity: this.state.isOpen ? [0, 1] : [1, 0],
        },
        { duration: 0.3, easing: "ease-out" },
      );
    }
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { node } = this.props;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div class="ml-4">
        {/* Node Header */}
        <div
          class="flex items-center space-x-2 cursor-pointer py-1 hover:bg-gray-100 rounded"
          onClick={this.toggleOpen}
        >
          {hasChildren && (
            <span class="text-gray-600">{this.state.isOpen ? "▼" : "▶"}</span>
          )}
          <span class={hasChildren ? "font-bold" : ""}>{node.name}</span>
        </div>

        {/* Children */}
        {hasChildren && (
          <div
            ref={(el) => (this.nodeRef = el)}
            class={`overflow-hidden ${!this.state.isOpen ? "h-0" : ""}`}
          >
            <div class="ml-4">
              {node.children.map((child, index) => (
                <TreeNode key={index} node={child} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: initialTreeData,
    };
  }

  render() {
    return (
      <div class="flex flex-col items-start space-y-4 p-4 max-w-md">
        <h2 class="text-xl font-bold">Tree View</h2>
        <div class="w-full bg-white p-4 rounded-lg shadow-lg border">
          <TreeNode node={this.state.treeData} />
        </div>
      </div>
    );
  }
}

export default TreeView;
