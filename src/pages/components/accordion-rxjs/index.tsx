import { Component, linkEvent } from "inferno";
import { BehaviorSubject } from "rxjs";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items?: AccordionItem[];
  allowMultiple?: boolean;
};

// RxJS state management
class AccordionStore {
  private _openPanels = new BehaviorSubject<Set<string>>(new Set());
  openPanels$ = this._openPanels.asObservable();

  togglePanel(id: string, allowMultiple: boolean) {
    const newPanels = new Set(this._openPanels.getValue());
    if (newPanels.has(id)) {
      newPanels.delete(id);
    } else {
      if (!allowMultiple) newPanels.clear();
      newPanels.add(id);
    }
    this._openPanels.next(newPanels);
  }
}

const store = new AccordionStore();

// Add safe default value for items
function Accordion(props: AccordionProps) {
  const items = props.items || [];

  return (
    <div class="w-full max-w-md mx-auto border rounded-md shadow-sm">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          allowMultiple={props.allowMultiple}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  allowMultiple = false,
}: {
  item: AccordionItem;
  allowMultiple?: boolean;
}) {
  return (
    <div class="border-b">
      <button
        class="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
        onClick={linkEvent({ id: item.id, allowMultiple }, handleClick)}
      >
        {item.title}
      </button>
      <AccordionContent id={item.id} content={item.content} />
    </div>
  );
}

// Helper function for linkEvent
function handleClick({
  id,
  allowMultiple,
}: {
  id: string;
  allowMultiple?: boolean;
}) {
  store.togglePanel(id, allowMultiple || false);
}

class AccordionContent extends Component<
  { id: string; content: string },
  { isOpen: boolean }
> {
  private subscription: any;

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    // Subscribe to store changes
    this.subscription = store.openPanels$.subscribe((openPanels) => {
      this.setState({ isOpen: openPanels.has(this.props.id) });
    });
  }

  componentWillUnmount() {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const { content } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        class={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div class="p-4">{content}</div>
      </div>
    );
  }
}

export default Accordion;
