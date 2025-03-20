import { createElement } from "inferno-create-element";
import { render, Component } from "inferno";
import { clsx } from "clsx";

class AccordionItem extends Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { title, content } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="border-b">
        <button
          className="w-full text-left p-3 font-bold bg-gray-100 hover:bg-gray-200"
          onClick={this.toggle}
        >
          {title}
        </button>
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300",
            isOpen ? "max-h-40 p-3" : "max-h-0 p-0",
          )}
        >
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    );
  }
}

export class Accordion extends Component {
  render() {
    return (
      <div className="max-w-md mx-auto border rounded shadow">
        <AccordionItem title="Item 1" content="Content for item 1." />
        <AccordionItem title="Item 2" content="Content for item 2." />
        <AccordionItem title="Item 3" content="Content for item 3." />
      </div>
    );
  }
}
